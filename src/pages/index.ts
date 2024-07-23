import gsap from 'gsap';

export function astroLoad() {
    gsap.to("#home-vid", { right: 0, opacity: 1, duration: 0.6, ease: 'back.inOut(1)' });
    gsap.to("#back-vid-name", { bottom: '128px', opacity: 1, duration: 0.4, delay: 0.4, ease: 'back.inOut(1)' });
    gsap.to("#back-vid-icon", { bottom: '64px', opacity: 1, duration: 0.4, delay: 0.4, ease: 'back.inOut(1)' });
}