import gsap from 'gsap';

import { delay } from "./async";
import { randRangeInt } from "./random";

type typedLinesOptions = {
    typeSpeed: number, 
    lineSpeed: number, 
    lineSpeedMin?: number, 
    lineSpeedMax?: number, 
    beginDelay?: number, 
    emulateConsoleScroll?: boolean,
    emulateConsoleLineAmount?: number,
    onComplete?: () => void,
};

export async function typeLines(element: Element, lines: string[], options: typedLinesOptions) {
    if (options.beginDelay) await delay(options.beginDelay);

    var emulatedScrollLines = 1;
    for (let i = 0; i < lines.length; i++) {
        if (element) {
            if (options.emulateConsoleScroll && options.emulateConsoleLineAmount) {
                if (i >= options.emulateConsoleLineAmount + 1) {
                    const lineHeight = Number(window.getComputedStyle(element).lineHeight.substring(0, 2));
                    gsap.to(element, { y: -(emulatedScrollLines * lineHeight), duration: 0.4, ease: 'power4.out' });
                    emulatedScrollLines++;
                }
            }

            await typeText(element, lines[i], options);
            element.innerHTML += '<br>';
            
            let lDelay = options.lineSpeed;
            if (options.lineSpeed === -1 && options.lineSpeedMin !== undefined && options.lineSpeedMax !== undefined) {
                lDelay = randRangeInt(options.lineSpeedMin, options.lineSpeedMax);
            }
    
            await delay(lDelay);
        }
    }
    if (options.onComplete && element) options.onComplete();
}

type typedTextOptions = {
    typeSpeed: number, 
    beginDelay?: number, 
    onComplete?: () => void,
};

export async function typeText(element: Element, text: string, options: typedTextOptions) {
    if (options.beginDelay) await delay(options.beginDelay);
    for (let i = 0; i < text.length; i++) {
        if (element) {
            if (i < text.length) {
                const char = text[i];
                element.append(char);
                await delay(options.typeSpeed);
            }
        }
    }
    if (options.onComplete && element) options.onComplete();
}

type untypedTextOptions = {
    typeSpeed: number, 
    beginDelay?: number, 
    onComplete?: () => void,
};

export async function untypeText(element: Element, options: untypedTextOptions) {
    if (options.beginDelay) await delay(options.beginDelay);
    if (element.textContent) {
        for (let i = 0; i < element.textContent.length; i++) {
            if (element) {
                if (i > 0) {
                    element.innerHTML = element.innerHTML.substring(0, element.innerHTML.length - 2);
                    await delay(options.typeSpeed);
                }
            }
        }
        if (options.onComplete) options.onComplete();
    }
}

function isWhitespace(char: string) {
    const code = char.charCodeAt(0);
    return code === 32 || (code >= 9 && code <= 13);
}
