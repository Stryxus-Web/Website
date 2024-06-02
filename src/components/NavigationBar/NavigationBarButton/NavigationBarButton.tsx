import "./NavigationBarButton.sass";

import { Link } from "../../link";

export default function NavigationBarButton ({ icon, relativeLink }) {
    return (
        <Link className="nav-button" href={relativeLink} class="nav-button">
            <div class="icon-container">
                <img src={icon} alt="Nav Button" />
            </div>
            <div class="bullet-container">
                <small class="active-bullet">&bull;</small>
            </div>
        </Link>
    )
}