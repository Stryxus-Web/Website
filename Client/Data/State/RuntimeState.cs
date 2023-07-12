using Microsoft.JSInterop;

namespace Stryxus.Client.Data.State;

internal class RuntimeState
{
    private IJSRuntime IJS { get; }

    public RuntimeState(IJSRuntime IJS)
    {
        this.IJS = IJS;
    }

    internal async Task SetLocalStorageItem(string key, string value)
    {
        await IJS.InvokeVoidAsync("runtime.localstorage.set", key, value);
    }

    internal async Task<string> GetLocalStorageItem(string key)
    {
        return await IJS.InvokeAsync<string>("runtime.localstorage.get", key);
    }
}
