import { DotNet } from "./globals";
import { waitForElement } from "./standard/mutations";

import gsap from "gsap";

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        navigationBar: any
    }
}

window.navigationBar = {

    animator: {
        transitionPage: (link: string) =>
        {
            const trans = document.getElementById("page-transitioner");
            if (trans) {
                const cans = document.querySelectorAll('#page-transitioner > :not(div)');
                cans.forEach(c => {
                    c.remove();
                });

                gsap.to(trans, { zIndex: 1000, onComplete: () => 
                    {
                        gsap.to(trans, { opacity: 1, duration: 0.25, onComplete: () => 
                            {
                                DotNet.invokeMethodAsync("NavigatePage", link).then((data: unknown) => {
                                    if (data) {
                                        console.log(data);
                                    } else {
                                        // TODO: If there is a timeout after 30 seconds, ask if they would like to continue or go back.
                                        waitForElement("#main-body", 30000).then(() => 
                                        {
                                            const trans = document.getElementById("page-transitioner");
                                            gsap.to(trans, { opacity: 0, duration: 0.25, delay: 0.5, onComplete: () => 
                                                {
                                                    gsap.to(trans, { zIndex: -4, onComplete: () => 
                                                        {
                                                            DotNet.invokeMethodAsync("FinishPageNavigation").then((data: unknown) => 
                                                            {
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
        }
    }
}
