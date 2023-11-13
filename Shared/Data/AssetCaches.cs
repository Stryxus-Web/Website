using System.Net.Http.Json;
using System.Reflection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Stryxus.Data.State;

namespace Stryxus.Data;

public class AssetCaches
{
    public class BACList
    {
        public List<string>? Files { get; set; }
    }

    private Dictionary<string, Tuple<string, string?>> BACLinks { get; set; } = new();

    private bool SupportsAVIF = false;

    private static BACList? BAC;

    public async Task Init(bool isServer, IRuntimeState? RS = null, HttpClient? client = null)
    {
        if (!isServer && RS is not null && client is not null)
        {
            await GetAVIFSupport(RS);
            BAC = await client.GetFromJsonAsync<BACList?>("assets.json");
        }
        if (BAC is not null && BAC.Files is not null)
        {
            for (int i = 0; i < BAC.Files.Count - 1; i++)
            {
                if (BAC.Files[i].EndsWith(".avif"))
                {
                    BACLinks.Add(BAC.Files[i][..BAC.Files[i].IndexOf('.')], new(BAC.Files[i], BAC.Files[i + 1]));
                    i++;
                } 
                else BACLinks.Add(BAC.Files[i][..BAC.Files[i].IndexOf('.')], new(BAC.Files[i], null));
            }
        }
        else throw new InvalidOperationException("The Blazor Asset Caches JSON was not retreived.");
    }

    public string Asset(string relativePath)
    {
        bool hasRelative;
        if (hasRelative = relativePath.StartsWith("/")) relativePath = relativePath[1..];
        relativePath = relativePath[..relativePath.IndexOf('.')];
        if (BACLinks.TryGetValue(relativePath, out Tuple<string, string?>? val))
        {
            if (val is not null)
            {
                if (val.Item1.StartsWith("img/"))
                {
                    if (val.Item2 is not null) return $"{(hasRelative ? "/" : string.Empty)}{(SupportsAVIF ? val.Item1 : val.Item2)}";
                    else return $"{(hasRelative ? "/" : string.Empty)}{val.Item1}";
                }
                else return $"{(hasRelative ? "/" : string.Empty)}{val.Item1}";
            }
            else return "unknown";
        }
        else return "unknown";
    }

    public async Task GetAVIFSupport(IRuntimeState RS)
    {
        if (bool.TryParse(await RS.GetLocalStorageItem("supportAVIF"), out bool supports)) SupportsAVIF = supports;
    }

    //

    public static async Task ReadBacServer()
    {
        try
        {
            FileInfo bac = new(new List<string>(Directory.GetFiles(Globals.Content_Path)).Where(x => x.Contains("assets.json")).First());
            using StreamReader stream = new(bac.OpenRead());
            BAC = JsonConvert.DeserializeObject<BACList?>(await stream.ReadToEndAsync());
        } catch
        {
            Console.Error.WriteLine("Blazing has not been run to generate the assets.json!");
        }
    }
}
