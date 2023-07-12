using System.Net.Http.Json;

using Stryxus.Client.Data.State;

namespace Stryxus.Client.Data;

internal class AssetCaches
{
    internal class BACList
    {
        public List<string>? Files { get; set; }
    }

    private Dictionary<string, string> BACLinks { get; set; } = new();

    private bool SupportsAVIF = false;

    private HttpClient Client { get; }
    private RuntimeState RS { get; }

    public AssetCaches(HttpClient Client, RuntimeState RS)
    {
        this.Client = Client;
        this.RS = RS;
    }

    internal async Task Init()
    {
        if (bool.TryParse(await RS.GetLocalStorageItem("supportAVIF"), out bool supports)) SupportsAVIF = supports;
        BACList? bac = await Client.GetFromJsonAsync<BACList>("bac.json");
        if (bac is not null && bac.Files is not null)
        {
            foreach (string f in bac.Files) BACLinks.Add($"{f[..f.IndexOf('.')]}{f[f.LastIndexOf('.')..]}", f);
        }
    }

    internal string Asset(string relativePath)
    {
        bool hasRelative;
        if (hasRelative = relativePath.StartsWith("/")) relativePath = relativePath[1..];
        if (BACLinks.TryGetValue(relativePath, out string? val)) return val is not null ? 
                $"{(hasRelative ? "/" : string.Empty)}{(SupportsAVIF ? val : val.Replace(".avif", ".webp"))}" : 
                $"unknown.{(SupportsAVIF ? "avif" : "webp")}";
        else return $"unknown.{(SupportsAVIF ? "avif" : "webp")}";
    }
}
