// DotNet

declare global {
    interface Window {
        setNavigationAnimatorDotNetReference: (ref: never) => void
    }
}

export declare let DotNet: {
    invokeMethodAsync: (name: string, data?: string) => Promise<void>;
};

window.setNavigationAnimatorDotNetReference = (ref: never) => {
    DotNet = ref;
};


export declare let Blazor: {
    start: () => Promise<void>;
};

// Variables

