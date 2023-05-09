using Microsoft.AspNetCore.ResponseCompression;

using CompressedStaticFiles;

// The website will be proxied by Cloudflare so, no need to add some things like security headers.

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();
builder.Services.AddCompressedStaticFiles(o => {
    o.EnablePrecompressedFiles = true;
    o.RemoveImageSubstitutionCostRatio();
});

WebApplication app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseWebAssemblyDebugging();
}
app.UseBlazorFrameworkFiles();
app.UseCompressedStaticFiles();
app.UseRouting();
app.MapRazorPages();
app.MapFallbackToFile("index.html");
#if DEBUG
await app.RunAsync("https://0.0.0.0:7076");
#else
await app.RunAsync();
#endif
