import { window } from './globals';
import { addWindowSizeListener, isBreakpointDownLG } from './mediaQueries';
import { isNavbarOpen, toggleNavbar } from './navigationBar';
import { waitForElement } from './standard/mutations';

import gsap from 'gsap';

// Pre-App

document.addEventListener('DOMContentLoaded', async () => {
    const trans: HTMLElement | null = document.getElementById('preapp-transit');
    if (trans !== null) {
        // TODO: Make better use of these tests
        testForWebAssembly();
        testForFLAC();
        // TODO: Use the local storage to store a load mode value
        if (window.location.hostname == 'stryxus.xyz') {
            document.getElementById('start')?.addEventListener('click', () => loadWASM(trans, true));
        } else {
            loadWASM(trans, false);
        }
    }

    function loadWASM(trans: HTMLElement, delay: boolean) {
        trans.style.zIndex = '10000';
        gsap.to(trans, { opacity: 1, duration: 0.33, onComplete: () => {
            const appEl = document.getElementById('app');
            if (appEl) {
                appEl.style.backgroundColor = 'unset';
                appEl.style.height = 'unset';
            }
            window.Blazor.start().then(() => {
                waitForElement('.page').then(() => {
                    setTimeout(() => {
                        init();
                        gsap.to(trans, { opacity: 0, duration: 0.33, onComplete: () => trans.remove()});
                    }, delay ? 1500 : 0);
                });
            });
        }});
    }

}, false);

function testForWebAssembly(): boolean {
    try {
        if (typeof WebAssembly === 'object' && typeof WebAssembly.instantiate === 'function') {
            const m = new WebAssembly.Module(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));
            return m instanceof WebAssembly.Module ? new WebAssembly.Instance(m) instanceof WebAssembly.Instance : false;
        }
    } catch (e) {
        return false;
    }
    return false;
}

function testForFLAC(): boolean {
    const testVid: HTMLVideoElement = document.createElement('video');
    const sup = testVid.canPlayType('audio/ogg; codecs=\'opus\'') !== '';
    testVid.remove();
    return sup;
}

// Initialization

function init() {

    document.getElementById('m-button')?.addEventListener('click', () => adaptMobileButton(true));

    const avatarImg: HTMLElement | null = document.getElementById('avatar-img-container');
    if (avatarImg) {
        avatarImg.addEventListener('click', () => adaptMobileButton());
    }

    const navButtons: HTMLCollection | null = document.getElementsByClassName('nav-button');
    if (navButtons) {
        Array.from(navButtons).forEach(el => {
            el.addEventListener('click', () => adaptMobileButton());
        });
    }

    let isFirstRender = true;
    async function adaptMobileButton(forceOpen?: boolean) {
        const mobileButton: HTMLElement | null = document.getElementById('m-button');
        if (mobileButton) {
            if (forceOpen) {
                mobileButton.style.display = 'none';
                toggleNavbar(true);
            } else {
                if (isBreakpointDownLG) {
                    if (isNavbarOpen || isFirstRender) {
                        toggleNavbar(false);
                        mobileButton.style.display = 'unset';
                    }
                } else {
                    if (!isNavbarOpen || isFirstRender) {
                        mobileButton.style.display = 'none';
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

// .NET Interop

window.runtime = {
    localstorage: {
        set: (key: string, value: string) => {
            localStorage.setItem(key, value);
        },
        get: (key: string) => {
            return localStorage.getItem(key);
        }
    },
}
