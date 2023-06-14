import { } from "./globals";
import { addWindowSizeListener, isBreakpointDownMD } from "./mediaQueries";
import { isNavbarOpen, toggleNavbar } from "./navigationBar";
import { waitForElement } from "./standard/mutations";

import gsap from "gsap";

// Pre-App

document.addEventListener("DOMContentLoaded", async () => {

    const trans: HTMLElement | null = document.getElementById("page-transitioner-pre");
    const app: HTMLElement | null = document.getElementById("app");

    if (window.location.hostname === "www.stryxus.xyz") {
        determineTestResult(testForWebAssembly(), "test-wasm");
        determineTestResult(await testForAVIF(), "test-avif");
        determineTestResult(testForAV1(), "test-av1opus");
        determineTestResult(testForFLAC(), "test-flac");
    
        document.getElementById("start-button")?.addEventListener("click", () => {
            if (trans !== null && app !== null) {
                trans.style.zIndex = "10000";
                gsap.to(trans, { opacity: 1, duration: 0.33, onComplete: () => {
                    document.body.style.fontFamily = "SF-Pro-Display";
                    window.Blazor.start().then(() => {
                        waitForElement(".page").then(() => {
                            setTimeout(() => {
                                init();
                                gsap.to(trans, { opacity: 0, duration: 0.33, onComplete: () => {
                                    trans.remove();
                                }});
                            }, 1500);
                        });
                    });
                }});
            }
        });
    } else {
        window.Blazor.start().then(() => {
            waitForElement(".page").then(() => {
                init();
                gsap.to(trans, { opacity: 0, duration: 0.33, onComplete: () => {
                    trans?.remove();
                }});
            });
        });
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

    document.getElementById("mobile-open-button")?.addEventListener("click", () => {
        toggleNavbar(true);
    });

    const avatarImg: HTMLElement | null = document.getElementById("avatar-img");
    if (avatarImg !== null) {
        avatarImg.addEventListener("click", () => {
            if (isBreakpointDownMD) {
                toggleNavbar(false);
            }
        });
    }

    const navButtons: HTMLCollection | null = document.getElementsByClassName("navbar-button");
    if (navButtons !== null) {
        Array.from(navButtons).forEach(el => {
            el.addEventListener("click", () => {
                if (isBreakpointDownMD) {
                    toggleNavbar(false);
                }
            });
        });
    }

    async function adaptMobileButton() {
        const mobileButton: HTMLElement | null = document.getElementById("mobile-open-button");
        if (mobileButton !== null) {
            if (isBreakpointDownMD) {
                if (isNavbarOpen) {
                    mobileButton.style.display = "unset";
                    toggleNavbar(false);
                } else {
                    mobileButton.style.display = "none";
                }
            } else {
                mobileButton.style.display = "none";
                if (!isNavbarOpen) {
                    toggleNavbar(true);
                }
            }
        }
    }

    addWindowSizeListener(adaptMobileButton);

    adaptMobileButton();
}
