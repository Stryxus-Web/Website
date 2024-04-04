import Home_BackMain from "../assets/img/home/background.png";
import Media_Background0 from "../assets/img/media/background-0.png";
import Media_Background1 from "../assets/img/media/background-1.png";
import Media_Background2 from "../assets/img/media/background-2.png";
import Media_Background3 from "../assets/img/media/background-3.png";
import Media_Background4 from "../assets/img/media/background-4.png";
import Media_Background5 from "../assets/img/media/background-5.png";

import * as icons from "react-bootstrap-icons";

export interface NavPage {
    Name: string;
    RelativeLink: string;
    IconName: keyof typeof icons;
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
        IconName: "House",
        RelativeNavbarImageURLs: [ Home_BackMain ],
    },
    {
        Name: "Blog",
        RelativeLink: "/blog",
        IconName: "Newspaper",
    },
    {
        Name: "Projects",
        RelativeLink: "/projects",
        IconName: "Code",
    },
    {
        Name: "Gaming",
        RelativeLink: "/gaming",
        IconName: "Joystick",
    },
    {
        Name: "Setups",
        RelativeLink: "/setups",
        IconName: "PciCard",
    },
    {
        Name: "Media",
        RelativeLink: "/media",
        IconName: "CameraFill",
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
        IconName: "BrushFill",
    },
    {
        Name: "Health",
        RelativeLink: "/health",
        IconName: "HeartPulseFill",
    },
    {
        Name: "Music",
        RelativeLink: "/music",
        IconName: "MusicNoteBeamed",
    },
];