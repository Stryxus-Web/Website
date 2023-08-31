using Microsoft.JSInterop;

using Stryxus.Data.State;

namespace Stryxus.Client.Data.State;

internal class RuntimeState : IRuntimeState
{
    public IJSRuntime IJS { get; set; }

    public RuntimeState(IJSRuntime IJS)
    {
        this.IJS = IJS;
    }
}
