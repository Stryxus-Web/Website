using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

using Stryxus.Client;
using Stryxus.Client.Data.State;

WebAssemblyHost Host;
WebAssemblyHostBuilder HostBuilder = WebAssemblyHostBuilder.CreateDefault(args);
Services.SetConfiguration(HostBuilder.Configuration);
HostBuilder.RootComponents.Add<App>("#app");
HostBuilder.RootComponents.Add<HeadOutlet>("head::after");

HostBuilder.Services.AddHttpClient("Stryxus.ServerAPI", client => client.BaseAddress = new Uri(HostBuilder.HostEnvironment.BaseAddress));

// Supply HttpClient instances that include access tokens when making requests to the server project
HostBuilder.Services.AddScoped(sp => sp.GetRequiredService<IHttpClientFactory>().CreateClient("Stryxus.ServerAPI"));
HostBuilder.Services.AddSingleton(typeof(UIState));

Host = HostBuilder.Build();
Services.SetServiceProvider(Host.Services);
await Host.RunAsync();
