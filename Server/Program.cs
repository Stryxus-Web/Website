// The website will be proxied by Cloudflare so, no need to add some things like security headers.

using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Logging.Console;
using Stryxus.Module.Discord;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.Logging.AddFilter<ConsoleLoggerProvider>(level => level == LogLevel.None);

builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();

builder.Services.AddSingleton<StryxBot>();

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
app.MapRazorPages();
app.MapFallbackToFile("index.html");

string? discordToken;
if ((discordToken = app.Configuration["discord_token"]) is not null) app.Services.GetService<StryxBot>()?.Start(discordToken);

#if DEBUG
await app.RunAsync("https://0.0.0.0:7076");
#else
await app.RunAsync();
#endif
