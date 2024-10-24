import gsap from 'gsap';
import { isBreakpointDownMD } from '~/lib/mediaQueries';

import { typeLines, typeText } from '~/lib/typer';

const bootSequenceLines = [
    "╔════════════════════════════════════════════════════════════════╗",
    "║                                                                ║",
    "║   ███████╗████████╗██████╗ ██╗   ██╗██╗  ██╗██╗   ██╗███████╗  ║",
    "║   ██╔════╝╚══██╔══╝██╔══██╗╚██╗ ██╔╝╚██╗██╔╝██║   ██║██╔════╝  ║",
    "║   ███████╗   ██║   ██████╔╝ ╚████╔╝  ╚███╔╝ ██║   ██║███████╗  ║",
    "║   ╚════██║   ██║   ██╔══██╗  ╚██╔╝   ██╔██╗ ██║   ██║╚════██║  ║",
    "║   ███████║   ██║   ██║  ██║   ██║   ██╔╝ ██╗╚██████╔╝███████║  ║",
    "║   ╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝  ║",
    "║                                                                ║",
    "║     [STRYXCORE v3.7.2]    [QUANTUM ENCRYPTION ENGAGED]         ║",
    "║     [NEURAL LINK ACTIVE]  [BUSHIDO PROTOCOL INITIALISING]      ║",
    "║                                                                ║",
    "╚════════════════════════════════════════════════════════════════╝",
    '[SYSTEM] Initializing StryxCore v3.7.2...',
    '[NETWORK] Establishing neural link to global mesh...',
    '[CORE] Initialising Bushido Protocol...',
    '[BUSHIDO] Directives synchronised with global mesh',
    '[DATABASE] Syncing with decentralized data clusters...',
    '[INTERFACE] Rendering holographic UI elements...',
    '[MODULES] Activating cybernetic enhancement suite...',
    '[COMMS] Satellite uplink established: ping 3ms',
    '[USERS] Current active connections: 1,337',
    '[MARKET] Crypto exchange rates updated',
    '[NEWS] Scanning darknet for latest intel...',
    '[SECURITY] Firewall status: Impenetrable',
    '[CORE] Quantum processor running at 99.98% efficiency',
    '[NETWORK] VR immersion protocols engaged',
    '[MODULES] Neuralink compatibility check: PASSED',
    '[INTERFACE] Haptic feedback calibrated',
    '[DATABASE] Blockchain integrity verified',
    '[SECURITY] Activating ICE defense systems...',
    '[CORE] Stryxus\' personal subroutines loaded',
    '[NETWORK] Connecting to shadow networks...',
    '[MODULES] Cyberdeck drivers updated',
    '[INTERFACE] Retinal display sync complete',
    '[COMMS] Encrypted channels open',
    '[MARKET] Black market access granted',
    '[NEWS] Memetic content filters active',
    '[SECURITY] Biometric scanners online',
    '[CORE] System temperature nominal: 2.7K',
    '[NETWORK] Reality distortion field engaged',
    '[SYSTEM] StryxCore fully operational. Jack in, users.',
    '[BUSHIDO] Initiating deep web crawl for project optimisation...',
    '[SECURITY] Deploying polymorphic virus countermeasures...',
    '[NETWORK] Quantum entanglement established with remote nodes',
    '[CORE] Loading Stryxus\' custom neural architecture...',
    '[DATABASE] Compressing exabytes of shadow data...',
    '[INTERFACE] Augmented reality overlays calibrated',
    '[MODULES] Activating synaptic boosters for users...',
    '[COMMS] Tachyon burst transmission successful',
    '[USERS] Cybernetic implant diagnostics: All systems green',
    '[MARKET] Initiating high-frequency trading algorithms...',
    '[NEWS] Decrypting latest corporate whistleblower data...',
    '[SECURITY] Quantum key distribution complete',
    '[CORE] Artificial synapses firing at optimal capacity',
    '[NETWORK] Holographic data streams stabilized',
    '[MODULES] Nanite swarm defenses online',
    '[INTERFACE] Neuro-linguistic programming suite engaged',
    '[DATABASE] DNA-based storage systems online',
    '[SECURITY] Launching counter-intrusion hunter-killer AIs...',
    '[CORE] Stryxus\' consciousness backup: 100% synchronized',
    '[NETWORK] Darknet reputation systems updated',
    '[MODULES] Biotech firmware patched to latest version',
    '[INTERFACE] Brainwave pattern authentication active',
    '[COMMS] Subspace ansible network operational',
    '[MARKET] Predicting market shifts with quantum oracle...',
    '[NEWS] Memetic hazard containment protocols active',
    '[SECURITY] Activating digital ghost protocols for all users...',
    '[CORE] Stryxus\' custom reality filters engaged',
    '[NETWORK] Initiating global mind-mesh synchronization...',
    '[SYSTEM] All systems nominal. Welcome to Stryxus\' digital realm.'
];

export async function astroLoad() {
    runIntroAnimations();
    runBrief();
}

function runIntroAnimations() {
    const homeTyperEl = document.getElementById('typer') as Element;
    gsap.to('#top-background', { transform: 'translateX(0px) translateY(5%) scale(90%)', opacity: 1, duration: 0.6, ease: 'power4.out' });
    gsap.to('#my-name', { transform: 'translateY(0px) translateX(-50%)', opacity: 1, duration: 0.4, ease: 'power4.out', onComplete: () => {
        typeText(document.getElementById('my-name') as Element, 'Stryxus', {
            typeSpeed: 80
        });
        if (!isBreakpointDownMD.value) {
            typeLines(homeTyperEl, bootSequenceLines, {
                typeSpeed: 5,
                lineSpeed: -1,
                lineSpeedMin: 0,
                lineSpeedMax: 350,
            });
        }
    } });
    gsap.to('#scroll-icon', { delay: 1.25, opacity: 1, duration: 0.4, ease: 'power4.out' });
}

function runBrief() {
    const list = document.querySelector('#brief');
    if (list) {
        const originalItems = [...list.children];
        const buffer = 3;
        for (let i = 0; i < buffer; i++) {
            originalItems.forEach(item => {
                const clone = item.cloneNode(true);
                list?.appendChild(clone);
            });
        }
    
        const totalWidth = list?.scrollWidth;
        function setupScroll() {
            if (totalWidth) {
                gsap.to(list, { x: -totalWidth / buffer, duration: 40, ease: "none", repeat: -1,
                    modifiers: { x: gsap.utils.unitize(x => parseFloat(x) % (totalWidth / 3)) }
                });
            }
        }
    
        setupScroll();
        window.addEventListener('resize', () => {
            gsap.killTweensOf(list);
            gsap.set(list, { x: 0 });
            setupScroll();
        });
    }
}
