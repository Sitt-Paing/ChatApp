using Microsoft.AspNetCore.Authentication;
using ChatApp.Auth;
using ChatApp.Hubs;
using ChatApp.Services;

var builder = WebApplication.CreateBuilder(args);
var supabaseUrl = builder.Configuration["Supabase:Url"]
    ?? throw new InvalidOperationException("Configure Supabase:Url.");
var publishableKey = builder.Configuration["Supabase:PublishableKey"]
    ?? throw new InvalidOperationException("Configure Supabase:PublishableKey.");
builder.Services.AddHttpClient("Supabase", client =>
{
    client.BaseAddress = new Uri(supabaseUrl.TrimEnd('/') + "/");
    client.DefaultRequestHeaders.Add("apikey", publishableKey);
    client.Timeout = TimeSpan.FromSeconds(20);
});
builder.Services.AddAuthentication(SupabaseAuthenticationHandler.SchemeName)
    .AddScheme<AuthenticationSchemeOptions, SupabaseAuthenticationHandler>(
        SupabaseAuthenticationHandler.SchemeName, _ => { });
builder.Services.AddAuthorization();
builder.Services.AddSignalR(options => options.MaximumReceiveMessageSize = 32 * 1024);
builder.Services.AddScoped<IMessageStore, SupabaseMessageStore>();
builder.Services.AddCors(options => options.AddPolicy("AngularDevelopment", policy =>
    policy.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod().AllowCredentials()));
builder.Services.AddControllers();
builder.Services.AddOpenApi();

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseCors("AngularDevelopment");
}
else
{
    app.UseHsts();
    app.UseHttpsRedirection();
}
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapHub<ChatHub>("/hub", options => options.CloseOnAuthenticationExpiration = true)
    .RequireAuthorization();
app.UseDefaultFiles();
app.UseStaticFiles();
app.MapFallbackToFile("index.html");
app.Run();

public partial class Program { }
