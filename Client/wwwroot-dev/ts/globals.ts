// DotNet

declare global {
    interface Window {
        setNavigationAnimatorDotNetReference: (ref: never) => void
        Blazor: {
            start: () => Promise<void>
        }
    }
}

export declare let DotNet: {
    invokeMethodAsync: (name: string, data?: string) => Promise<void>;
};

window.setNavigationAnimatorDotNetReference = (ref: never) => {
    DotNet = ref;
};

// Variables

