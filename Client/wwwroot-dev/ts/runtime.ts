import { } from "./globals";
import { addWindowSizeListener, isBreakpointDownMD } from "./mediaQueries";
import { isNavbarOpen, toggleNavbar } from "./navigationBar";
import { waitForElement } from "./standard/mutations";

import gsap from "gsap";

// Pre-App

document.addEventListener("DOMContentLoaded", async () => {

    let supportAVIF = false;
    localStorage.setItem("supportAVIF", (supportAVIF = await testForAVIF()).toString());

    const trans: HTMLElement | null = document.getElementById("page-transitioner-pre");
    if (trans !== null) {
        if (window.location.hostname === "www.stryxus.xyz") {
            determineTestResult(testForWebAssembly(), "test-wasm");
            determineTestResult(supportAVIF, "test-avif");
            determineTestResult(testForAV1(), "test-av1opus");
            determineTestResult(testForFLAC(), "test-flac");

            document.getElementById("start-button")?.addEventListener("click", () => loadWASM(trans, true));
        } else {
            loadWASM(trans, false);
        }   
    }

    function loadWASM(trans: HTMLElement, delay: boolean) {
        trans.style.zIndex = "10000";
        gsap.to(trans, { opacity: 1, duration: 0.33, onComplete: () => {
            document.body.style.fontFamily = "SF-Pro-Display";
            window.Blazor.start().then(() => {
                waitForElement(".page").then(() => {
                    setTimeout(() => {
                        init();
                        gsap.to(trans, { opacity: 0, duration: 0.33, onComplete: () => trans.remove()});
                    }, delay ? 1500 : 0);
                });
            });
        }});
    }

    function determineTestResult(result: boolean, elementName: string) {
        const card: HTMLElement | null = document.getElementById(elementName);
        card?.classList.add(result ? "good" : "bad");
        card?.getElementsByTagName("i")[0].classList.replace("bi-question-lg", result ? "bi-check-circle" : "bi-x-circle");
        if (!result) {
            let button: HTMLElement | null;
            if ((button = document.getElementById("start-button")) !== null) {
                button.getElementsByTagName("h1")[0].innerText = "I know what I'm doing! Start the Website!";
            }
        }
    }

}, false);

function testForWebAssembly(): boolean {
    try {
        if (typeof WebAssembly === "object" && typeof WebAssembly.instantiate === "function") {
            const m = new WebAssembly.Module(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));
            return m instanceof WebAssembly.Module ? new WebAssembly.Instance(m) instanceof WebAssembly.Instance : false;
        }
    } catch (e) {
        return false;
    }
    return false;
}

function testForAVIF(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
        const img = new Image();
        img.onerror = () => resolve(false);
        img.onload = () => resolve(true);
        img.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";
        img.remove();
    }).catch(() => false);
}

function testForAV1(): boolean {
    const testVid: HTMLVideoElement = document.createElement("video");
    const sup = testVid.canPlayType("video/mp4; codecs=\"av01.2.15M.10.0.100.09.16.09.0, opus\"") !== "";
    testVid.remove();
    return sup;
}

function testForFLAC(): boolean {
    const testVid: HTMLVideoElement = document.createElement("video");
    const sup = testVid.canPlayType("audio/ogg; codecs=\"opus\"") !== "";
    testVid.remove();
    return sup;
}

// Initialization

function init() {

    document.getElementById("mobile-open-button")?.addEventListener("click", () => adaptMobileButton(true));

    const avatarImg: HTMLElement | null = document.getElementById("avatar-img");
    if (avatarImg !== null) {
        avatarImg.addEventListener("click", () => adaptMobileButton());
    }

    const navButtons: HTMLCollection | null = document.getElementsByClassName("navbar-button");
    if (navButtons !== null) {
        Array.from(navButtons).forEach(el => {
            el.addEventListener("click", () => adaptMobileButton());
        });
    }

    let isFirstRender = true;
    async function adaptMobileButton(forceOpen?: boolean) {
        const mobileButton: HTMLElement | null = document.getElementById("mobile-open-button");
        if (mobileButton !== null) {
            if (forceOpen) {
                mobileButton.style.display = "none";
                toggleNavbar(true);
            } else {
                if (isBreakpointDownMD) {
                    if (isNavbarOpen || isFirstRender) {
                        toggleNavbar(false);
                        mobileButton.style.display = "unset";
                    }
                } else {
                    if (!isNavbarOpen || isFirstRender) {
                        mobileButton.style.display = "none";
                        toggleNavbar(true);
                    }
                }
                isFirstRender = false;
            }
        }
    }

    addWindowSizeListener(adaptMobileButton);
    adaptMobileButton();
}

// .NET

window.runtime = {
    localstorage: {
        set: (key: string, value: string) => {
            localStorage.setItem(key, value);
        },
        get: (key: string) => {
            return localStorage.getItem(key);
        }
    }
}
