using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

using Newtonsoft.Json;

namespace Stryxus.Website.Data.States;

internal class UIState
{
    private IJSRuntime JSRuntime { get; set; }
    private AssetCaches AC { get; set; }
    private NavigationManager Navigation { get; set; }

    public UIState(IJSRuntime jSRuntime, NavigationManager navigationManager, AssetCaches assetCaches)
    {
        JSRuntime = jSRuntime;
        AC = assetCaches;
        Navigation = navigationManager;

        PageContexts = [
            new() {
                    Name = "Home",
                    RelativeLink = "/",
                    IconName = "home",
                    RelativeNavbarImageURLs = new[] { AC.Asset("/img/home/back_main.avif") }
                },
            new() {
                    Name = "Blog",
                    RelativeLink = "/blog",
                    IconName = "newspaper"
                },
            new() {
                    Name = "Projects",
                    RelativeLink = "/projects",
                    IconName = "code"
                },
            new() {
                    Name = "Gaming",
                    RelativeLink = "/gaming",
                    IconName = "joystick"
                },
            new() {
                    Name = "Setups",
                    RelativeLink = "/setups",
                    IconName = "pci-card"
                },
            new() {
                    Name = "Media",
                    RelativeLink = "/media",
                    IconName = "camera-fill",
                    RelativeNavbarImageURLs = new[]
                {
                    AC.Asset("/img/media/background-0.avif"),
                    AC.Asset("/img/media/background-1.avif"),
                    AC.Asset("/img/media/background-2.avif"),
                    AC.Asset("/img/media/background-3.avif"),
                    AC.Asset("/img/media/background-4.avif"),
                    AC.Asset("/img/media/background-5.avif"),
                }
                 },
            new() {
                    Name = "Art",
                    RelativeLink = "/art",
                    IconName = "brush-fill"
                },
            new() {
                    Name = "Health",
                    RelativeLink = "/health",
                    IconName = "heart-pulse-fill"
                },
            new() {
                    Name = "Music",
                    RelativeLink = "/music",
                    IconName = "music-note-beamed"
                },
        ];

        Uri navURI = new(Navigation.Uri);
        try
        {
            if (Navigation.Uri == Navigation.BaseUri || !PageContexts.Any(o => o.RelativeLink == navURI.AbsolutePath)) CurrentPageContext = PageContexts.First(x => x.RelativeLink == "/");
            else
            {
                PageContext newConext = PageContexts.First(x => x.RelativeLink == navURI.AbsolutePath);
                if (!PageIsTransitioning && !CurrentPageContext.Equals(newConext)) CurrentPageContext = newConext;
            }
        }
        catch { Navigation.NavigateTo(string.Empty); }
    }

    internal struct PageContext
    {
        internal string Name;
        internal string RelativeLink;
        internal string IconName;
        internal object[]? RelativeNavbarImageURLs;
    }

    internal List<PageContext> PageContexts { get; private set; }

    internal Action? OnCurrentPageContextChange;
    private PageContext currentPageContext;
    internal PageContext CurrentPageContext
    {
        get => currentPageContext;
        set
        {
            if (!currentPageContext.Equals(value))
            {
                currentPageContext = value;
                Task.Run(async () =>
                {
                    OnCurrentPageContextChange?.Invoke();
                    PageIsTransitioning = true;
                    await JSRuntime.InvokeVoidAsync("navigationBar.animator.transitionPage", value.RelativeLink, JsonConvert.SerializeObject(value.RelativeNavbarImageURLs));
                });
            }
        }
    }

    internal Action? OnPageIsTransitioningChange;
    private bool pageIsTransitioning;
    internal bool PageIsTransitioning
    {
        get => pageIsTransitioning;
        set
        {
            pageIsTransitioning = value;
            OnPageIsTransitioningChange?.Invoke();
        }
    }

    internal Action? OnSettingsMenuToggle;
    private bool isSettingsMenuVisible;
    internal bool IsSettingsMenuVisible
    {
        get => isSettingsMenuVisible;
        set
        {
            isSettingsMenuVisible = value;
            OnSettingsMenuToggle?.Invoke();
        }
    }
}
