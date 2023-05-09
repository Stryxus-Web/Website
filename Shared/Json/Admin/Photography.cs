namespace Stryxus.Shared.Json.Admin;

public class Photography
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime TakenAt { get; set; }
    public long FileSize { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
    public bool HDRSupported { get; set; }
    public string UsedPhotoshop { get; set; }
    public string TakenWithDevice { get; set; }
    public string TakenWithApp { get; set; }
    public string DeviceCameraMode { get; set; }
}
