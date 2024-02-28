namespace Stryxus.Website;

public static class Globals
{
#if DEBUG
    public static string Content_Path = Path.Join(Directory.GetCurrentDirectory()[..(Directory.GetCurrentDirectory().LastIndexOf("\\"))], "Stryxus.Website", "wwwroot");
#else
    public static string Content_Path = Path.Join(Directory.GetCurrentDirectory(), "wwwroot");
#endif
}
