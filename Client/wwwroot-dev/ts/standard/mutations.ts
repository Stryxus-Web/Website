export const waitForElement = (querySelector: string) => {
    return new Promise<void>((resolve) => {

        if (document.querySelectorAll(querySelector).length) return resolve();
        const observer = new MutationObserver(() => {
            if (document.querySelectorAll(querySelector).length) {
                observer.disconnect();
                return resolve();
            }
        });
        
        observer.observe(document.body, {
            characterData: true,
            attributes: true,
            childList: true,
            subtree: true
        });
    });
}

