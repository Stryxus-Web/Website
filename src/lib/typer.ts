import { delay } from "./async";
import { randRangeInt } from "./random";

// Change the parameter lists to their own types

export async function typeLines(element: Element, lines: string[], typeSpeed: number, lineSpeed: number = 1000, lineSppedMin?: number, lineSpeedMax?: number, beginDelay?: number, onComplete?: () => void) {
    if (beginDelay) await delay(beginDelay);
    for (let i = 0; i < lines.length; i++) {
        if (element) {
            await typeText(element, lines[i], typeSpeed);
            element.innerHTML += '<br>';
            
            let lDelay = lineSpeed;
            if (lineSpeed === -1 && lineSppedMin !== undefined && lineSpeedMax !== undefined) {
                lDelay = randRangeInt(lineSppedMin, lineSpeedMax);
            }
    
            await delay(lDelay);
        }
    }
    if (onComplete && element) onComplete();
}

export async function typeText(element: Element, text: string, typeSpeed: number, beginDelay?: number, onComplete?: () => void) {
    if (beginDelay) await delay(beginDelay);
    for (let i = 0; i < text.length; i++) {
        if (element) {
            if (i < text.length) {
                const char = text[i];
                element.append(char);
                await delay(typeSpeed);
            }
        }
    }
    if (onComplete && element) onComplete();
}

export async function untypeText(element: Element, typeSpeed: number, beginDelay?: number, onComplete?: () => void) {
    if (beginDelay) await delay(beginDelay);
    if (element.textContent) {
        for (let i = 0; i < element.textContent.length; i++) {
            if (element) {
                if (i > 0) {
                    element.innerHTML = element.innerHTML.substring(0, element.innerHTML.length - 2);
                    await delay(typeSpeed);
                }
            }
        }
        if (onComplete) onComplete();
    }
}
