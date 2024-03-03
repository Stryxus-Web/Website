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
builder.Services.AddRazorComponents().AddInteractiveServerComponents();

builder.Services.AddSingleton<Github>();
builder.Services.AddScoped<AssetCaches>();
builder.Services.AddScoped<UIState>();

FileExtensionContentTypeProvider provider = new();
provider.Mappings[".avif"] = "image/avif";

WebApplication app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
}
app.UseStaticFiles(new StaticFileOptions
{
    ContentTypeProvider = provider
});
app.UseStaticFiles();
app.UseRouting();
app.UseAntiforgery();
app.MapControllers();
app.MapRazorComponents<App>().AddInteractiveServerRenderMode();

app.Services.GetService<Github>()?.GetCommits();

#if DEBUG
await app.RunAsync("https://0.0.0.0:7076");
#else
await app.RunAsync();
#endif
