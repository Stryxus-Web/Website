using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.JSInterop;

using Stryxus.Data;
using Stryxus.Client;
using Stryxus.Client.Data.State;

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
