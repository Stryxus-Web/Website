using System.Reflection;

using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Logging.Console;

using Stryxus.Website.Components;
using Stryxus.Website.Data;
using Stryxus.Website.Data.States;

await AssetCaches.ReadBacServer();
await AssetCaches.Init(true);

IConfiguration configuration = new ConfigurationBuilder()
    .AddEnvironmentVariables()
    .AddCommandLine(args)
    .AddJsonFile("appsettings.json")
    .AddUserSecrets(Assembly.GetExecutingAssembly())
    .Build();

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
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
builder.Services.AddRazorComponents().AddInteractiveServerComponents();

builder.Services.AddScoped<RuntimeState>();
builder.Services.AddScoped<AssetCaches>();
builder.Services.AddScoped<UIState>();
builder.Services.AddSingleton<Github>();

FileExtensionContentTypeProvider provider = new();
provider.Mappings[".avif"] = "image/avif";
provider.Mappings[".webp"] = "image/webp";

WebApplication app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.UseStaticFiles(new StaticFileOptions
{
    ContentTypeProvider = provider
});
app.UseStaticFiles();
app.UseRouting();
app.UseAntiforgery();
#if RELEASE
app.UseCors();
#endif
app.MapControllers();
app.MapRazorComponents<App>().AddInteractiveServerRenderMode();

Core.app = app;
app.Services.GetService<Github>()?.GetCommits();

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

// Old WASM Program code
/*
WebAssemblyHost Host;
WebAssemblyHostBuilder HostBuilder = WebAssemblyHostBuilder.CreateDefault(args);
Services.SetConfiguration(HostBuilder.Configuration);
HostBuilder.RootComponents.Add<App>("#app");
HostBuilder.RootComponents.Add<HeadOutlet>("head::after");

HostBuilder.Services.AddHttpClient("Stryxus.ServerAPI", client => client.BaseAddress = new Uri(HostBuilder.HostEnvironment.BaseAddress));
HostBuilder.Services.AddSingleton(sp => sp.GetRequiredService<IHttpClientFactory>().CreateClient("Stryxus.ServerAPI"));
HostBuilder.Services.AddSingleton<RuntimeState>();
HostBuilder.Services.AddSingleton<AssetCaches>();
HostBuilder.Services.AddSingleton<UIState>();

Host = HostBuilder.Build();

RuntimeState? rState;
if ((rState = Host.Services.GetRequiredService<RuntimeState>()) != null)
{
    HttpClient Client;
    IJSRuntime? IJS;
    if ((Client = Host.Services.GetRequiredService<HttpClient>()) != null && (IJS = Host.Services.GetRequiredService<IJSRuntime>()) != null)
    {
        rState.IJS = IJS;
        await Host.Services.GetRequiredService<AssetCaches>().Init(false, rState, Client);
    }
}

Services.SetServiceProvider(Host.Services);
await Host.RunAsync();
*/
