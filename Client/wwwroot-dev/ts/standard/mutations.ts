export const waitForElement = (querySelector: string, timeout: number) => {
    return new Promise<void>((resolve, reject) => {
        let timer: NodeJS.Timeout;

        if (document.querySelectorAll(querySelector).length) return resolve();
        const observer = new MutationObserver(() => {
            if (document.querySelectorAll(querySelector).length) {
                observer.disconnect();
                if (timer !== undefined) clearTimeout(timer);
                return resolve();
            }
        });
        
        observer.observe(document.body, {
            characterData: true,
            attributes: true,
            childList: true,
            subtree: true
        });

        if (timeout) {
            timer = setTimeout(() => {
                observer.disconnect();
                reject();
            }, timeout);
        }
    });
}