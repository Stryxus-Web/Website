using Microsoft.JSInterop;

using Stryxus.Data.State;

namespace Stryxus.Server.Data.State;

internal class RuntimeState : IRuntimeState
{
    public IJSRuntime? IJS { get; set; }
}
