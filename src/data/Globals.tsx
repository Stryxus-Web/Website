
import Home_BackMain from '../assets/img/home/background.png';
import Media_Background0 from '../assets/img/media/background-0.png';
import Media_Background1 from '../assets/img/media/background-1.png';
import Media_Background2 from '../assets/img/media/background-2.png';
import Media_Background3 from '../assets/img/media/background-3.png';
import Media_Background4 from '../assets/img/media/background-4.png';
import Media_Background5 from '../assets/img/media/background-5.png';


export interface NavPage {
    Name: string;
    RelativeLink: string;
    IconName: string;
    RelativeNavbarImageURLs?: string[];
}

export const Pages: NavPage[] = [
    {
        Name: 'Home',
        RelativeLink: '/',
        IconName: 'home',
        RelativeNavbarImageURLs: [ Home_BackMain ],
    },
    {
        Name: 'Blog',
        RelativeLink: '/blog',
        IconName: 'newspaper',
    },
    {
        Name: 'Projects',
        RelativeLink: '/projects',
        IconName: 'code',
    },
    {
        Name: 'Gaming',
        RelativeLink: '/gaming',
        IconName: 'joystick',
    },
    {
        Name: 'Setups',
        RelativeLink: '/setups',
        IconName: 'pci-card',
    },
    {
        Name: 'Media',
        RelativeLink: '/media',
        IconName: 'camera-fill',
        RelativeNavbarImageURLs:
        [
            Media_Background0,
            Media_Background1,
            Media_Background2,
            Media_Background3,
            Media_Background4,
            Media_Background5,
        ],
    },
    {
        Name: 'Art',
        RelativeLink: '/art',
        IconName: 'brush-fill',
    },
    {
        Name: 'Health',
        RelativeLink: '/health',
        IconName: 'heart-pulse-fill',
    },
    {
        Name: 'Music',
        RelativeLink: '/music',
        IconName: 'music-note-beamed',
    },
];