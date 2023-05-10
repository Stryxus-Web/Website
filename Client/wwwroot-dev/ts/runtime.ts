import { } from "./globals";
import { waitForElement } from "./standard/mutations";

import gsap from "gsap";

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("start-button")?.addEventListener("click", () => 
    {
        const trans: HTMLElement | null = document.getElementById("page-transitioner-pre");
        const app: HTMLElement | null = document.getElementById("app");

        if (trans !== null && app !== null) {
            trans.style.zIndex = "10000";
            gsap.to(trans, { opacity: 1, duration: 0.33, onComplete: () => 
            {
                document.body.style.fontFamily = "SF-Pro-Display";
                window.Blazor.start().then(() =>
                {
                    waitForElement(`#${app.id}`, 30000).then(() => 
                    {
                        setTimeout(() => {
                            gsap.to(trans, { opacity: 0, duration: 0.33, onComplete: () => {
                                trans.remove();
                            } });
                        }, 1000);
                    });
                });
            }});
        }

        //
        
    });
}, false);

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