import { DotNet } from "./globals";
import { isBreakpointDownMD } from "./mediaQueries";
import { waitForElement } from "./standard/mutations";

import gsap from "gsap";

window.navigationBar = {
    animator: {
        transitionPage: (link: string, imageURLs: string) =>
        {
            const trans = document.getElementById("page-transitioner");
            if (trans) {
                const cans = document.querySelectorAll('#page-transitioner > :not(div)');
                cans.forEach(c => c.remove());
                gsap.to(trans, { zIndex: 1000, onComplete: () => {
                    gsap.to(trans, { ease: "sine.out", duration: 0.33, opacity: 1, onComplete: () => {
                        window.navigationBar.animator.setNavbarBackground(imageURLs);
                        DotNet.invokeMethodAsync("NavigatePage", link).then((data: unknown) => {
                            if (data) {
                                console.log(data);
                            } else {
                                // TODO: If there is a timeout after 30 seconds, ask if they would like to continue or go back.
                                waitForElement("#main-body").then(() => {
                                    const trans = document.getElementById("page-transitioner");
                                    gsap.to(trans, { ease: "sine.out", duration: 0.33, delay: 0.5, opacity: 0, onComplete: () => {
                                        gsap.to(trans, { zIndex: -4, onComplete: () => {
                                            DotNet.invokeMethodAsync("FinishPageNavigation").then((data: unknown) => {
                                                if (data) {
                                                    console.log(data);
                                                }
                                            });
                                        }});
                                    }});
                                });
                            }
                        });
                    }});
                }});
            }
        },
        setNavbarBackground(imageURLs: string) {
            const navbar: HTMLElement | null = document.getElementById("navbar");
            if (navbar !== null && imageURLs.length !== 0) {
                const imgurls = JSON.parse(imageURLs);
                if (imgurls !== null) navbar.style.backgroundImage = `url('${imgurls[Math.floor(Math.random() * imgurls.length)]}')`;
            }
        }
    }
}

export let isNavbarOpen = !isBreakpointDownMD;
export function toggleNavbar(open: boolean)
{
    const mobileButton: HTMLElement | null = document.getElementById("mobile-open-button");
    const mainBorder: HTMLElement | null = document.getElementById("main-border");
    const mainBody: HTMLElement | null = document.getElementById("main-body");
    const pageTransitioner: HTMLElement | null = document.getElementById("page-transitioner");

    if (mobileButton !== null && mainBorder !== null && mainBody !== null && pageTransitioner !== null) {
        isNavbarOpen = open;
        if (open) {
            mobileButton.style.display = "none";
            gsap.to(mainBody, { ease: "sine.out", duration: 0.33, top: "16px", bottom: "16px", left: "108px" });
            gsap.to(mainBorder, { ease: "sine.out", duration: 0.33, top: "8px", bottom: "8px", left: "99px" });
            gsap.to(pageTransitioner, { ease: "sine.out", duration: 0.33, top: "16px", bottom: "16px", left: "108px" });
        } else {
            gsap.to(mainBody, { ease: "sine.out", duration: 0.33, top: "0px", bottom: "0px", left: "18px" });
            gsap.to(mainBorder, { ease: "sine.out", duration: 0.33, top: "0px", bottom: "0px", left: "0px" });
            gsap.to(pageTransitioner, { ease: "sine.out", duration: 0.33, top: "0px", bottom: "0px", left: "18px", onComplete: () => {
                mobileButton.style.display = "unset";
            }});
        }
    }
}
