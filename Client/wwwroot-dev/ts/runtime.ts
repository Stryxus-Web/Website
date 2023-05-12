import { } from "./globals";
import { addWindowSizeListener, isBreakpointDownMD } from "./mediaQueries";
import { isNavbarOpen, toggleNavbar } from "./navigationBar";
import { waitForElement } from "./standard/mutations";

import gsap from "gsap";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("start-button")?.addEventListener("click", () => {
        const trans: HTMLElement | null = document.getElementById("page-transitioner-pre");
        const app: HTMLElement | null = document.getElementById("app");

        if (trans !== null && app !== null) {
            trans.style.zIndex = "10000";
            gsap.to(trans, { opacity: 1, duration: 0.33, onComplete: () => {
                document.body.style.fontFamily = "SF-Pro-Display";
                window.Blazor.start().then(() => {
                    waitForElement(`#${app.id}`, 30000).then(() => {
                        setTimeout(() => {
                            init();
                            gsap.to(trans, { opacity: 0, duration: 0.33, onComplete: () => {
                                trans.remove();
                            }});
                        }, 1000);
                    });
                });
            }});
        }
    });
}, false);

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

    function adaptMobileButton() {
        console.log(isBreakpointDownMD);
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

export function testForAV1() {
    const testVid: HTMLVideoElement = document.createElement("video");
    testVid.canPlayType("video/mp4; codecs=\"av01, aac\"");
    testVid.remove();
}

export function testForVP9() {
    const testVid: HTMLVideoElement = document.createElement("video");
    testVid.canPlayType("video/mp4; codecs=\"vp9, aac\"");
    testVid.remove();
}