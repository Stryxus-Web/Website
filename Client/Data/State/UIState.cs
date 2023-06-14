using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

using Newtonsoft.Json;

namespace Stryxus.Client.Data.State;

internal class UIState
{
    internal struct PageContext
    {
        internal string Name;
        internal string RelativeLink;
        internal string IconName;
        internal object[] RelativeNavbarImageURLs;
    }

    internal void SetPageContexts(List<PageContext> contexts) => PageContexts = contexts; 

    internal List<PageContext>? PageContexts { get; private set; }
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
                        Services.Get<IJSRuntime>()?.InvokeVoidAsync("navigationBar.animator.transitionPage", value?.RelativeLink, JsonConvert.SerializeObject(value?.RelativeNavbarImageURLs));
                    }
                    else
                    {
                        Services.Get<IJSRuntime>()?.InvokeVoidAsync("navigationBar.animator.setNavbarBackground", JsonConvert.SerializeObject(value?.RelativeNavbarImageURLs));
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
}
