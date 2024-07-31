import { randRangeInt } from "./random";

// Change the parameter lists to their own types

export async function typeLines(element: Element, lines: string[], speed: number, lineDelay: number = 1000, lineDelayMin?: number, lineDelayMax?: number, onComplete?: () => void) {
    for (let i = 0; i < lines.length; i++) {
        await typeText(element, lines[i], speed);
        element.innerHTML += '<br>';
        
        // Determine the delay for the next line
        let delay = lineDelay;
        if (lineDelay === -1 && lineDelayMin !== undefined && lineDelayMax !== undefined) {
            delay = randRangeInt(lineDelayMin, lineDelayMax);
        }
        
        // Wait for the specified delay before typing the next line
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    if (onComplete) onComplete();
}

export async function typeText(element: Element, text: string, speed: number, onComplete?: () => void) {
    return await new Promise<void>((resolve, reject) => {
        let i = 0;
        const typingInterval = setInterval(() => {
            if (element) {
                if (i < text.length) {
                    const char = text[i];
                    element.append(char);
                    i++;
                } else {
                    clearInterval(typingInterval);
                    if (onComplete) onComplete();
                    resolve();
                }
            } else {
                clearInterval(typingInterval);
                reject();
            }
        }, speed);
    });
}

export async function untypeText(element: Element, speed: number, delay?: number, onComplete?: () => void) {
    return await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            let i = element.innerHTML.length;
            const typingInterval = setInterval(() => {
                if (element) {
                    if (i > 0) {
                        element.innerHTML = element.innerHTML.substring(0, element.innerHTML.length - 2)
                    } else {
                        clearInterval(typingInterval);
                        if (onComplete) onComplete();
                        resolve();
                    }
                } else {
                    clearInterval(typingInterval);
                    reject();
                }
            }, speed);
        }, delay ? delay : 0);
    });
}
