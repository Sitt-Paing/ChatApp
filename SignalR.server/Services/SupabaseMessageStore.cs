using System.Net.Http.Headers;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.SignalR;

namespace SignalR.Services;

public sealed record MessageRow(
    [property: JsonPropertyName("id")] Guid Id,
    [property: JsonPropertyName("sender_id")] Guid SenderId,
    [property: JsonPropertyName("recipient_id")] Guid RecipientId,
    [property: JsonPropertyName("body")] string Body,
    [property: JsonPropertyName("created_at")] DateTimeOffset CreatedAt);

public interface IMessageStore
{
    Task<MessageRow> SaveAsync(string token, Guid senderId, Guid recipientId, string body, CancellationToken cancellationToken);
}

public sealed class SupabaseMessageStore(IHttpClientFactory clients) : IMessageStore
{
    public async Task<MessageRow> SaveAsync(
        string token, Guid senderId, Guid recipientId, string body, CancellationToken cancellationToken)
    {
        using var request = new HttpRequestMessage(HttpMethod.Post, "rest/v1/messages")
        {
            Content = JsonContent.Create(new { sender_id = senderId, recipient_id = recipientId, body })
        };
        // Forward the caller's token so database RLS still checks the actual sender.
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
        request.Headers.Add("Prefer", "return=representation");
        using var response = await clients.CreateClient("Supabase").SendAsync(request, cancellationToken);
        if (!response.IsSuccessStatusCode)
            throw new HubException("Message could not be saved. Check your session and selected contact.");
        var rows = await response.Content.ReadFromJsonAsync<MessageRow[]>(cancellationToken);
        return rows is { Length: 1 } ? rows[0] : throw new HubException("Message could not be saved.");
    }
}
