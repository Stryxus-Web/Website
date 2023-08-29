// The website will be proxied by Cloudflare so, no need to add some things like security headers.

using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Logging.Console;
using Stryxus.Module.Discord;
using System.Reflection;

IConfiguration configuration = new ConfigurationBuilder()
    .AddEnvironmentVariables()
    .AddCommandLine(args)
    .AddJsonFile("appsettings.json")
    .AddUserSecrets(Assembly.GetExecutingAssembly())
    .Build();

WebApplicationBuilder builder = WebApplication.CreateBuilder();
builder.Configuration.AddConfiguration(configuration);
builder.Logging.AddFilter<ConsoleLoggerProvider>(level => level == LogLevel.None);

builder.Services.AddControllers();
builder.Services.AddRazorPages();

string? discordToken;
if ((discordToken = configuration["discord_token"]) is not null) builder.Services.AddSingleton(new StryxBot(discordToken));

FileExtensionContentTypeProvider provider = new();
provider.Mappings[".avif"] = "image/avif";
provider.Mappings[".webp"] = "image/webp";

WebApplication app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseWebAssemblyDebugging();
}
app.UseBlazorFrameworkFiles();
app.UseStaticFiles(new StaticFileOptions
{
    ContentTypeProvider = provider
});
app.UseStaticFiles();
app.UseRouting();
app.MapControllers();
app.MapRazorPages();
app.MapFallbackToFile("index.html");

Core.app = app;

#if DEBUG
await app.RunAsync("https://0.0.0.0:7076");
#else
await app.RunAsync();
#endif

internal static class Core
{
    internal static WebApplication app;

    internal static void Shutdown()
    {
        app.Lifetime.StopApplication();
    }
}
