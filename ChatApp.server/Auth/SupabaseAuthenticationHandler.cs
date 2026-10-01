using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Text.Json;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Options;

namespace ChatApp.Auth;

// Ask Supabase Auth to verify the token. Supports both legacy and asymmetric signing keys.
// No service-role key is needed, and unverified JWT claims never authorize a user.
public sealed class SupabaseAuthenticationHandler(
    IOptionsMonitor<AuthenticationSchemeOptions> options,
    ILoggerFactory logger,
    UrlEncoder encoder,
    IHttpClientFactory clients)
    : AuthenticationHandler<AuthenticationSchemeOptions>(options, logger, encoder)
{
    public const string SchemeName = "Supabase";

    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        string? token = null;
        if (AuthenticationHeaderValue.TryParse(Request.Headers.Authorization, out var header)
            && header.Scheme.Equals("Bearer", StringComparison.OrdinalIgnoreCase))
            token = header.Parameter;

        // Browsers use a query token for WebSockets / SSE. Only accept it on the hub.
        if (string.IsNullOrEmpty(token) && Request.Path.StartsWithSegments("/hub")
            && (Context.WebSockets.IsWebSocketRequest ||
                Request.Headers.Accept.ToString().Contains("text/event-stream", StringComparison.OrdinalIgnoreCase)))
            token = Request.Query["access_token"];

        if (string.IsNullOrEmpty(token)) return AuthenticateResult.NoResult();
        if (token.Length > 16_384) return AuthenticateResult.Fail("Invalid access token.");

        try
        {
            using var request = new HttpRequestMessage(HttpMethod.Get, "auth/v1/user");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            using var response = await clients.CreateClient("Supabase")
                .SendAsync(request, Context.RequestAborted);
            if (!response.IsSuccessStatusCode) return AuthenticateResult.Fail("Invalid or expired session.");

            using var user = JsonDocument.Parse(await response.Content.ReadAsStringAsync(Context.RequestAborted));
            if (!Guid.TryParse(user.RootElement.GetProperty("id").GetString(), out var userId))
                return AuthenticateResult.Fail("Invalid user.");

            // Supabase has already verified the complete token above. Read expiry only
            // to close a long-lived hub connection when that verified token expires.
            var parts = token.Split('.');
            if (parts.Length != 3) return AuthenticateResult.Fail("Invalid access token.");
            using var payload = JsonDocument.Parse(WebEncoders.Base64UrlDecode(parts[1]));
            var expires = DateTimeOffset.FromUnixTimeSeconds(payload.RootElement.GetProperty("exp").GetInt64());
            if (expires <= DateTimeOffset.UtcNow) return AuthenticateResult.Fail("Expired session.");

            var identity = new ClaimsIdentity(
                [new Claim(ClaimTypes.NameIdentifier, userId.ToString())], SchemeName);
            var properties = new AuthenticationProperties { ExpiresUtc = expires };
            properties.StoreTokens([new AuthenticationToken { Name = "access_token", Value = token }]);
            return AuthenticateResult.Success(new AuthenticationTicket(
                new ClaimsPrincipal(identity), properties, SchemeName));
        }
        catch (Exception exception) when (exception is HttpRequestException or TaskCanceledException
            or JsonException or FormatException or KeyNotFoundException or ArgumentOutOfRangeException)
        {
            return AuthenticateResult.Fail("Unable to verify the session.");
        }
    }
}
