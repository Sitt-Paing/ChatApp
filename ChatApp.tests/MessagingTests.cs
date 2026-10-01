using System.Collections.Concurrent;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.SignalR.Client;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using ChatApp.Services;
using Xunit;

namespace ChatApp.Tests;

public sealed class MessagingTests
{
    private static readonly Guid Sender = Guid.Parse("11111111-1111-4111-8111-111111111111");
    private static readonly Guid Recipient = Guid.Parse("22222222-2222-4222-8222-222222222222");
    private static readonly Guid Outsider = Guid.Parse("33333333-3333-4333-8333-333333333333");

    [Fact]
    public async Task Anonymous_and_invalid_tokens_cannot_negotiate()
    {
        await using var app = CreateApp(new FakeSupabase());
        using var client = app.CreateClient();
        using var anonymous = await client.PostAsync("/hub/negotiate?negotiateVersion=1", null);
        Assert.Equal(HttpStatusCode.Unauthorized, anonymous.StatusCode);
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "invalid");
        using var invalid = await client.PostAsync("/hub/negotiate?negotiateVersion=1", null);
        Assert.Equal(HttpStatusCode.Unauthorized, invalid.StatusCode);
    }

    [Fact]
    public async Task Saved_messages_reach_sender_tabs_and_recipient_but_not_outsider()
    {
        var supabase = new FakeSupabase();
        await using var app = CreateApp(supabase);
        var senderToken = supabase.Token(Sender);
        await using var sender = Connect(app, senderToken);
        await using var senderTab = Connect(app, senderToken);
        await using var recipient = Connect(app, supabase.Token(Recipient));
        await using var outsider = Connect(app, supabase.Token(Outsider));
        var senderEvent = new TaskCompletionSource<MessageRow>(TaskCreationOptions.RunContinuationsAsynchronously);
        var senderTabEvent = new TaskCompletionSource<MessageRow>(TaskCreationOptions.RunContinuationsAsynchronously);
        var recipientEvent = new TaskCompletionSource<MessageRow>(TaskCreationOptions.RunContinuationsAsynchronously);
        var outsiderEvents = new ConcurrentQueue<MessageRow>();
        sender.On<MessageRow>("messageReceived", row => senderEvent.TrySetResult(row));
        senderTab.On<MessageRow>("messageReceived", row => senderTabEvent.TrySetResult(row));
        recipient.On<MessageRow>("messageReceived", row => recipientEvent.TrySetResult(row));
        outsider.On<MessageRow>("messageReceived", outsiderEvents.Enqueue);
        await Task.WhenAll(sender.StartAsync(), senderTab.StartAsync(), recipient.StartAsync(), outsider.StartAsync());

        var saved = await sender.InvokeAsync<MessageRow>("SendMessage", Recipient.ToString(), "  Hello from SignalR  ");
        Assert.Equal(Sender, saved.SenderId);
        Assert.Equal(Recipient, saved.RecipientId);
        Assert.Equal("Hello from SignalR", saved.Body);
        Assert.Equal(saved.Id, (await senderEvent.Task.WaitAsync(TimeSpan.FromSeconds(5))).Id);
        Assert.Equal(saved.Id, (await senderTabEvent.Task.WaitAsync(TimeSpan.FromSeconds(5))).Id);
        Assert.Equal(saved.Id, (await recipientEvent.Task.WaitAsync(TimeSpan.FromSeconds(5))).Id);
        Assert.Single(supabase.Saved);
        Assert.Equal(senderToken, supabase.LastSaveToken);
        Assert.Empty(outsiderEvents);

        await Assert.ThrowsAsync<Microsoft.AspNetCore.SignalR.HubException>(() =>
            sender.InvokeAsync<MessageRow>("SendMessage", Sender.ToString(), "Self message"));
        await Assert.ThrowsAsync<Microsoft.AspNetCore.SignalR.HubException>(() =>
            sender.InvokeAsync<MessageRow>("SendMessage", "invalid-recipient", "Hello"));
        await Assert.ThrowsAsync<Microsoft.AspNetCore.SignalR.HubException>(() =>
            sender.InvokeAsync<MessageRow>("SendMessage", Recipient.ToString(), "   "));
        await Assert.ThrowsAsync<Microsoft.AspNetCore.SignalR.HubException>(() =>
            sender.InvokeAsync<MessageRow>("SendMessage", Recipient.ToString(), new string('x', 4001)));
        Assert.Single(supabase.Saved);

        supabase.FailSaves = true;
        await Assert.ThrowsAsync<Microsoft.AspNetCore.SignalR.HubException>(() =>
            sender.InvokeAsync<MessageRow>("SendMessage", Recipient.ToString(), "Must not deliver"));
        Assert.Single(supabase.Saved);
        Assert.Empty(outsiderEvents);
    }

    private static WebApplicationFactory<Program> CreateApp(FakeSupabase supabase) =>
        new WebApplicationFactory<Program>().WithWebHostBuilder(builder =>
        {
            builder.UseEnvironment("Development");
            builder.ConfigureServices(services =>
            {
                services.RemoveAll<IHttpClientFactory>();
                services.AddSingleton<IHttpClientFactory>(supabase);
            });
        });

    private static HubConnection Connect(WebApplicationFactory<Program> app, string token) =>
        new HubConnectionBuilder()
            .WithUrl(new Uri(app.Server.BaseAddress, "/hub"), options =>
            {
                options.Transports = HttpTransportType.LongPolling;
                options.AccessTokenProvider = () => Task.FromResult<string?>(token);
                options.HttpMessageHandlerFactory = _ => app.Server.CreateHandler();
            }).Build();

    private sealed class FakeSupabase : HttpMessageHandler, IHttpClientFactory
    {
        private readonly ConcurrentDictionary<string, Guid> users = new();
        public ConcurrentQueue<MessageRow> Saved { get; } = new();
        public string? LastSaveToken { get; private set; }
        public bool FailSaves { get; set; }

        public string Token(Guid user)
        {
            var token = "header." + WebEncoders.Base64UrlEncode(JsonSerializer.SerializeToUtf8Bytes(new
            {
                sub = user, exp = DateTimeOffset.UtcNow.AddHours(1).ToUnixTimeSeconds()
            })) + ".verified-by-test-auth";
            users[token] = user;
            return token;
        }

        public HttpClient CreateClient(string name) =>
            new(this, disposeHandler: false) { BaseAddress = new Uri("https://test.supabase.co/") };

        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            var token = request.Headers.Authorization?.Parameter ?? "";
            if (!users.TryGetValue(token, out var user))
                return new HttpResponseMessage(HttpStatusCode.Unauthorized);
            if (request.RequestUri!.AbsolutePath == "/auth/v1/user")
                return new HttpResponseMessage(HttpStatusCode.OK) { Content = JsonContent.Create(new { id = user }) };

            if (FailSaves) return new HttpResponseMessage(HttpStatusCode.Forbidden);
            using var content = JsonDocument.Parse(await request.Content!.ReadAsStringAsync(cancellationToken));
            Assert.Equal(user, content.RootElement.GetProperty("sender_id").GetGuid());
            var row = new MessageRow(Guid.NewGuid(), user,
                content.RootElement.GetProperty("recipient_id").GetGuid(),
                content.RootElement.GetProperty("body").GetString()!, DateTimeOffset.UtcNow);
            Saved.Enqueue(row);
            LastSaveToken = token;
            return new HttpResponseMessage(HttpStatusCode.Created) { Content = JsonContent.Create(new[] { row }) };
        }
    }
}
