namespace Stryxus.Client.Components.Media;

internal static class AzureBlobHandler
{
    internal static Uri BaseURL = new("https://stryxus.blob.core.windows.net/media");
    internal static Uri JSONURLPhotography = new(BaseURL + "/photography.json");
    internal static Uri JSONURLVideography = new(BaseURL + "/videography.json");
}
