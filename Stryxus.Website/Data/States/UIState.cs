using Microsoft.JSInterop;

using Newtonsoft.Json;

namespace Stryxus.Website.Data.States;

internal class UIState(IJSRuntime jSRuntime, AssetCaches assetCaches)
{
    internal struct PageContext
    {
        internal string Name;
        internal string RelativeLink;
        internal string IconName;
        internal object[]? RelativeNavbarImageURLs;
    }

    internal List<PageContext> PageContexts { get; private set; } =
        [
            new() {
                Name = "Home",
                RelativeLink = "/",
                IconName = "home",
                RelativeNavbarImageURLs = new[] { assetCaches.Asset("/img/home/back_main.avif") }
            },
            new()
            {
                Name = "Blog",
                RelativeLink = "/blog",
                IconName = "newspaper"
            },
            new()
            {
                Name = "Projects",
                RelativeLink = "/projects",
                IconName = "code"
            },
            new()
            {
                Name = "Gaming",
                RelativeLink = "/gaming",
                IconName = "joystick"
            },
            new()
            {
                Name = "Setups",
                RelativeLink = "/setups",
                IconName = "pci-card"
            },
            new()
            {
                Name = "Media",
                RelativeLink = "/media",
                IconName = "camera-fill",
                RelativeNavbarImageURLs = new[]
                {
                    assetCaches.Asset("/img/media/background-0.avif"),
                    assetCaches.Asset("/img/media/background-1.avif"),
                    assetCaches.Asset("/img/media/background-2.avif"),
                    assetCaches.Asset("/img/media/background-3.avif"),
                    assetCaches.Asset("/img/media/background-4.avif"),
                    assetCaches.Asset("/img/media/background-5.avif"),
                }
            },
            new()
            {
                Name = "Art",
                RelativeLink = "/art",
                IconName = "brush-fill"
            },
            new()
            {
                Name = "Health",
                RelativeLink = "/health",
                IconName = "heart-pulse-fill"
            },
            new()
            {
                Name = "Music",
                RelativeLink = "/music",
                IconName = "music-note-beamed"
            },
        ];

    internal Action? OnCurrentPageContextChange;
    private PageContext? currentPageContext;
    internal PageContext? CurrentPageContext
    {
        get => currentPageContext;
        set
        {
            if (!currentPageContext.Equals(value))
            {
                currentPageContext = value;
                Task.Run(() =>
                {
                    OnCurrentPageContextChange?.Invoke();
                    if (!IsFirstNavigation)
                    {
                        PageIsTransitioning = true;
                        jSRuntime.InvokeVoidAsync("navigationBar.animator.transitionPage", value?.RelativeLink, JsonConvert.SerializeObject(value?.RelativeNavbarImageURLs));
                    }
                    else
                    {
                        if (value?.RelativeNavbarImageURLs is not null && value?.RelativeNavbarImageURLs.Length is not 0)
                        {
                            jSRuntime.InvokeVoidAsync("navigationBar.animator.setNavbarBackground", JsonConvert.SerializeObject(value?.RelativeNavbarImageURLs));
                        }
                        IsFirstNavigation = false;
                    }
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

    internal bool IsFirstNavigation { get; set; } = true;

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
