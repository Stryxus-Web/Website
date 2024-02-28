using Microsoft.JSInterop;

namespace Stryxus.Website.Data.States;

internal class RuntimeState : IRuntimeState
{
    public IJSRuntime IJS { get; set; }

    public RuntimeState(IJSRuntime IJS)
    {
        this.IJS = IJS;
    }
}

