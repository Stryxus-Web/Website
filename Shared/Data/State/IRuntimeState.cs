using Microsoft.JSInterop;

namespace Stryxus.Data.State;

public interface IRuntimeState
{
    public IJSRuntime IJS { set;  get; }

    public async virtual Task SetLocalStorageItem(string key, string value) => await IJS.InvokeVoidAsync("runtime.localstorage.set", key, value);

    public async virtual Task<string> GetLocalStorageItem(string key) => await IJS.InvokeAsync<string>("runtime.localstorage.get", key);
}
