using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using ChatApp.Auth;
using ChatApp.Services;

namespace ChatApp.Hubs;

[Authorize]
public sealed class ChatHub(IMessageStore messages) : Hub
{
    public async Task<MessageRow> SendMessage(string recipientId, string text)
    {
        if (!Guid.TryParse(Context.UserIdentifier, out var sender))
            throw new HubException("Please sign in again.");
        if (!Guid.TryParse(recipientId, out var recipient) || sender == recipient)
            throw new HubException("Choose a valid contact.");
        var body = text?.Trim();
        if (string.IsNullOrEmpty(body) || body.Length > 4000)
            throw new HubException("Enter a message of 1–4000 characters.");

        var httpContext = Context.GetHttpContext() ?? throw new HubException("Invalid connection.");
        var token = await httpContext.GetTokenAsync(SupabaseAuthenticationHandler.SchemeName, "access_token");
        if (string.IsNullOrEmpty(token)) throw new HubException("Please sign in again.");
        var row = await messages.SaveAsync(token, sender, recipient, body, Context.ConnectionAborted);

        // Includes every active tab/device for the two authenticated users only.
        await Clients.Users(sender.ToString(), recipient.ToString())
            .SendAsync("messageReceived", row, Context.ConnectionAborted);
        return row;
    }
}
