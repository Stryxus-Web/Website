using System.Net.Http.Json;

using Newtonsoft.Json;

using Stryxus.Data.State;

namespace Stryxus.Data;

public class AssetCaches
{
    public class BACList
    {
        public List<List<string>>? Files { get; set; }
    }

    private List<Tuple<string, string?>>? BACLinks { get; set; }

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
            BACLinks = [];
            foreach (List<string> item in BAC.Files)
            {
                if (item.Count == 1)
                {
                    BACLinks.Add(new(item[0], null));
                }
                else BACLinks.Add(new(item[0], item[1]));
            }
        }
        else throw new InvalidOperationException("The Blazor Asset Caches JSON was not retreived!");
    }

    public string Asset(string relativePath)
    {
        if (BACLinks is not null)
        {
            try
            {
                Tuple<string, string?> asset = BACLinks.First(x => x.Item1 == (relativePath.Contains('/') ? relativePath[(relativePath.LastIndexOf('/') + 1)..] : relativePath));
                if (relativePath.EndsWith(".avif")) return $"/{(SupportsAVIF ? $"{asset.Item2}.avif" : $"{asset.Item2}.webp")}";
                else return $"/{asset.Item2}";
            }
            catch { return relativePath; }
        }
        else throw new InvalidOperationException("Asset Caches have not been initialised!");
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
