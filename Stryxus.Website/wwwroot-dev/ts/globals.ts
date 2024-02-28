// Variables

export const window = global.window;

// DotNet

declare global {
    interface Window {
        setNavigationAnimatorDotNetReference: (ref: never) => void
        Blazor: {
            start: () => Promise<void>
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        runtime: any

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        navigationBar: any
    }
}

export declare let DotNet: {
    invokeMethodAsync: (name: string, data?: string) => Promise<void>;
};

window.setNavigationAnimatorDotNetReference = (ref: never) => {
    DotNet = ref;
};
