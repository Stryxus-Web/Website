using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

using Stryxus.Client;
using Stryxus.Client.Data.State;
using Stryxus.Shared;

WebAssemblyHost Host;
WebAssemblyHostBuilder HostBuilder = WebAssemblyHostBuilder.CreateDefault(args);
Services.SetConfiguration(HostBuilder.Configuration);
HostBuilder.RootComponents.Add<App>("#app");
HostBuilder.RootComponents.Add<HeadOutlet>("head::after");

HostBuilder.Services.AddHttpClient("Stryxus.ServerAPI", client => client.BaseAddress = new Uri(HostBuilder.HostEnvironment.BaseAddress));
HostBuilder.Services.AddSingleton(sp => sp.GetRequiredService<IHttpClientFactory>().CreateClient("Stryxus.ServerAPI"));
HostBuilder.Services.AddSingleton(typeof(AssetCaches));
HostBuilder.Services.AddSingleton(typeof(UIState));

Host = HostBuilder.Build();

await Host.Services.GetRequiredService<AssetCaches>().GetBAC(Host.Services.GetRequiredService<HttpClient>());

Services.SetServiceProvider(Host.Services);
await Host.RunAsync();
