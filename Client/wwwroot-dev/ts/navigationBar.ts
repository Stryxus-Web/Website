import { window, DotNet } from './globals';
import { isBreakpointDownMD } from './mediaQueries';
import { waitForElement } from './standard/mutations';

import gsap from 'gsap';

export let isNavbarOpen = !isBreakpointDownMD;
export function toggleNavbar(open: boolean)
{
    const mobileButton: HTMLElement | null = document.getElementById('m-button');
    const mainBorder: HTMLElement | null = document.getElementById('border');
    const mainBody: HTMLElement | null = document.getElementsByTagName('main')[0];
    const pageTransitioner: HTMLElement | null = document.getElementById('page-transitioner');

    if (mobileButton && mainBorder && mainBody && pageTransitioner) {
        isNavbarOpen = open;
        if (open) {
            gsap.to(mainBody, { ease: 'sine.out', duration: 0.33, top: '16px', bottom: '16px', left: '108px' });
            gsap.to(mainBorder, { ease: 'sine.out', duration: 0.33, top: '8px', bottom: '8px', left: '99px' });
            gsap.to(pageTransitioner, { ease: 'sine.out', duration: 0.33, top: '16px', bottom: '16px', left: '108px' });
        } else {
            gsap.to(mainBody, { ease: 'sine.out', duration: 0.33, top: '0px', bottom: '0px', left: '18px' });
            gsap.to(mainBorder, { ease: 'sine.out', duration: 0.33, top: '0px', bottom: '0px', left: '0px' });
            gsap.to(pageTransitioner, { ease: 'sine.out', duration: 0.33, top: '0px', bottom: '0px', left: '18px' });
        }
    }
}

// .NET Interop

window.navigationBar = {
    animator: {
        transitionPage: (link: string, imageURLs: string) =>
        {
            const trans = document.getElementById('page-transitioner');
            if (trans) {
                const cans = document.querySelectorAll('#page-transitioner > :not(div)');
                cans.forEach(c => c.remove());
                gsap.to(trans, { zIndex: 1000, onComplete: () => {
                    gsap.to(trans, { ease: 'sine.out', duration: 0.33, opacity: 1, onComplete: () => {
                        window.navigationBar.animator.setNavbarBackground(imageURLs);
                        DotNet.invokeMethodAsync('NavigatePage', link).then((data: unknown) => {
                            if (data) {
                                console.log(data);
                            } else {
                                // TODO: If there is a timeout after 30 seconds, ask if they would like to continue or go back.
                                waitForElement('main').then(() => {
                                    const trans = document.getElementById('page-transitioner');
                                    gsap.to(trans, { ease: 'sine.out', duration: 0.33, delay: 0.5, opacity: 0, onComplete: () => {
                                        gsap.to(trans, { zIndex: -4, onComplete: () => {
                                            DotNet.invokeMethodAsync('FinishPageNavigation').then((data: unknown) => {
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
            const navbar: HTMLElement | null = document.getElementsByTagName('nav')[0];
            //const mainBody: HTMLElement | null = document.getElementsByTagName('main')[0];
            if (navbar /*&& mainBody*/ && imageURLs.length !== 0) {
                const imgurls = JSON.parse(imageURLs);
                if (imgurls !== null) {
                    // TODO: Make this fade in and out like the page
                    navbar.style.backgroundImage = `url('${imgurls[Math.floor(Math.random() * imgurls.length)]}')`;
                    //mainBody.style.backgroundImage = `url('${imgurls[Math.floor(Math.random() * imgurls.length)]}')`;
                }
            }
        },
    }
}
