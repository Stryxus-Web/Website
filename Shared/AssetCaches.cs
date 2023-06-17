using System.Net.Http.Json;

namespace Stryxus.Shared;

public class AssetCaches
{
    internal class BACList
    {
        public List<string>? Files { get; set; }
    }

    private Dictionary<string, string> BACLinks { get; set; } = new();

    public async Task GetBAC(HttpClient client)
    {
        BACList? bac = await client.GetFromJsonAsync<BACList>("bac.json");
        if (bac is not null && bac.Files is not null)
        {
            foreach (string f in bac.Files) BACLinks.Add($"{f[..f.IndexOf('.')]}{f[f.LastIndexOf('.')..]}", f);
        }
    }

    public string Asset(string relativePath)
    {
        bool hasRelative;
        if (hasRelative = relativePath.StartsWith("/")) relativePath = relativePath[1..];
        if (BACLinks.TryGetValue(relativePath, out string? val)) return val is not null ? $"{(hasRelative ? "/" : string.Empty)}{val}" : "unknown.avif";
        else return "unknown.avif";
    }
}
