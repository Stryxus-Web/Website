import gsap from 'gsap';

import { green, transparency, yellow } from "~/lib/variables";

const navigator = document.getElementById('navigator') as HTMLElement;

// Prevents to-same-page navigation which ended up breaking animations and more.
const handleLinkClick = (event: MouseEvent) => event.preventDefault();
export const updateNavLinks = () => {
    const currentPath = window.location.pathname;
    const links = navigator.querySelectorAll('a');
    links.forEach(link => {
        link.removeEventListener('click', handleLinkClick);
        if (link.pathname === currentPath) {
            link.addEventListener('click', handleLinkClick);
        }
    });
};

export function astroBeforePreparation() {
    // Prevents to-same-page navigation which ended up breaking animations and more.
    navigator.querySelectorAll('a').forEach(link => link.addEventListener('click', handleLinkClick));
}

export function astroLoad() {
    updateNavLinks();

    const currentPath = window.location.pathname;
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }

        link.addEventListener('click', () => {
            const menu = document.getElementById('mobile-menu-dropdown');
            menu?.classList.toggle('hidden');
        });
    });

    document.getElementById('mobile-menu-button')?.addEventListener('click', () => {
        const menu = document.getElementById('mobile-menu-dropdown');
        menu?.classList.toggle('hidden');
    });

    var mobileMenuScrolled = false;
    document.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            if (!mobileMenuScrolled) {
                mobileMenuScrolled = true;
                gsap.to('#mobile-menu', { background: `rgba(${green.substring(4, green.length - 1)}, ${transparency})`, duration: 0.4, ease: 'power4.out' });
            }
        } else if (mobileMenuScrolled) {
            gsap.to('#mobile-menu', { background: `rgba(${green.substring(4, green.length - 1)}, 1)`, duration: 0.4, ease: 'power4.out', onComplete: () => { mobileMenuScrolled = false; } });
        }
    });

    gsap.to('#navigator', { transform: 'translateY(0px) translateX(-50%)', duration: 0.4, ease: 'power4.out', onComplete: () => {
        gsap.to('.buttons-container', { opacity: 1, duration: 0.4, ease: 'power4.out' });
    } });
}
