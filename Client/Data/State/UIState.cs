using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace Stryxus.Client.Data.State;

internal class UIState
{
    internal struct PageContext
    {
        internal string Name;
        internal string RelativeLink;
        internal string IconName;
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
                        Services.Get<IJSRuntime>()?.InvokeVoidAsync("navigationBar.animator.transitionPage", value?.RelativeLink);
                    }
                    else IsFirstNavigation = false;
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
