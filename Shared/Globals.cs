namespace Stryxus;

public static class Globals
{
#if DEBUG
        public static string Content_Path = Path.Join(Directory.GetCurrentDirectory()[..(Directory.GetCurrentDirectory().LastIndexOf("\\"))], "Client", "wwwroot");
#else
        public static string Content_Path = Path.Join(Directory.GetCurrentDirectory(), "wwwroot");
#endif
}
