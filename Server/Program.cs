// The website will be proxied by Cloudflare.

using System.Reflection;

using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Logging.Console;
using Microsoft.AspNetCore.Server.Kestrel.Core;

using Stryxus.Data;
using Stryxus.Server;
using Stryxus.Server.Data.State;
using Stryxus.Server.Data;

IConfiguration configuration = new ConfigurationBuilder()
    .AddEnvironmentVariables()
    .AddCommandLine(args)
    .AddJsonFile("appsettings.json")
    .AddUserSecrets(Assembly.GetExecutingAssembly())
    .Build();

WebApplicationBuilder builder = WebApplication.CreateBuilder();
builder.Configuration.AddConfiguration(configuration);
builder.WebHost.ConfigureKestrel((context, options) =>
{
    options.AddServerHeader = false;
});
builder.Logging.AddFilter<ConsoleLoggerProvider>(level => level == LogLevel.None);

builder.Services.AddHttpClient();
builder.Services.AddControllersWithViews();
builder.Services.AddAntiforgery();
#if RELEASE
builder.Services.AddCors();
#endif
builder.Services.AddRazorPages();
builder.Services.AddRazorComponents();

builder.Services.AddScoped<RuntimeState>();
builder.Services.AddScoped<AssetCaches>();
builder.Services.AddSingleton<Github>();

// Save this to remember server component initilisation
//string? discordToken;
//if ((discordToken = configuration["discord_token"]) is not null) builder.Services.AddSingleton(new StryxBot(discordToken));

FileExtensionContentTypeProvider provider = new();
provider.Mappings[".avif"] = "image/avif";
provider.Mappings[".webp"] = "image/webp";

WebApplication app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseWebAssemblyDebugging();
}
else
{
    app.UseExceptionHandler("/Error");
}
app.UseBlazorFrameworkFiles();
app.UseStaticFiles(new StaticFileOptions
{
    ContentTypeProvider = provider
});
#if DEBUG
app.UseHttpsRedirection();
#endif
app.UseStaticFiles();
app.UseRouting();
app.UseAntiforgery();
#if RELEASE
app.UseCors();
#endif
app.MapControllers();
app.MapRazorPages();
app.MapRazorComponents<App>();

Core.app = app;

await AssetCaches.ReadBacServer();
app.Services.GetService<Github>()?.GetCommits();

Services.SetServiceProvider(app.Services);

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
