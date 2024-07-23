import gsap from 'gsap';

export function astroLoad() {
    const currentPath = window.location.pathname;
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    gsap.to("#navigator", { opacity: 1, top: '50px', duration: 0.5, ease: 'power3.inOut' });
}