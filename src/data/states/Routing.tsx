import faCamera from "../../assets/img/fa/solid/camera.svg";
import faCode from "../../assets/img/fa/solid/code.svg";
import faGamepad from "../../assets/img/fa/solid/gamepad.svg";
import faHeartPulse from "../../assets/img/fa/solid/heart-pulse.svg";
import faHouse from "../../assets/img/fa/solid/house.svg";
import faMicrochip from "../../assets/img/fa/solid/microchip.svg";
import faMusic from "../../assets/img/fa/solid/music.svg";
import faNewspaper from "../../assets/img/fa/solid/newspaper.svg";
import faPaintBrush from "../../assets/img/fa/solid/paintbrush.svg";

import Home_BackMain from "../../assets/img/home/background.png";
import Media_Background0 from "../../assets/img/media/background-0.png";
import Media_Background1 from "../../assets/img/media/background-1.png";
import Media_Background2 from "../../assets/img/media/background-2.png";
import Media_Background3 from "../../assets/img/media/background-3.png";
import Media_Background4 from "../../assets/img/media/background-4.png";
import Media_Background5 from "../../assets/img/media/background-5.png";

export interface NavPage {
    Name: string;
    RelativeLink: string;
    Hidden?: boolean;
    Icon?: string;
    RelativeNavbarImageURLs?: string[];
}

export let currentPage = {
    internalVal: undefined,
    internalListener: function(val: NavPage) {},
    set value(val: NavPage) {
        if (this.internalVal !== undefined) {
            this.internalVal = val;
            this.internalListener(val);
        } else {
            this.internalVal = val;
        }
    },
    get value(): NavPage {
        return this.internalVal;
    }
};

export const routerPages: NavPage[] = [
    {
        Name: "Home",
        RelativeLink: "/",
        Hidden: true,
        Icon: faHouse,
        RelativeNavbarImageURLs: [ Home_BackMain ],
    },
    {
        Name: "Blog",
        RelativeLink: "/blog",
        Icon: faNewspaper,
    },
    {
        Name: "Projects",
        RelativeLink: "/projects",
        Icon: faCode,
    },
    {
        Name: "Star Prism",
        RelativeLink: "/projects/starprism",
        Hidden: true,
    },
    {
        Name: "Gaming",
        RelativeLink: "/gaming",
        Icon: faGamepad,
    },
    {
        Name: "Setups",
        RelativeLink: "/setups",
        Icon: faMicrochip,
    },
    {
        Name: "Media",
        RelativeLink: "/media",
        Icon: faCamera,
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
        Name: "Art",
        RelativeLink: "/art",
        Icon: faPaintBrush,
    },
    {
        Name: "Health",
        RelativeLink: "/health",
        Icon: faHeartPulse,
    },
    {
        Name: "Music",
        RelativeLink: "/music",
        Icon: faMusic,
    },
];

export function setRoute(pathname: string) {
    currentPage.value = routerPages.find(x => x.RelativeLink == (pathname.length == 0 ? "/" : pathname));
    //setNavBackground();
}