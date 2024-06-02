import "./NavigationBar.sass";
import { currentPage } from "../../data/states/Routing";
import { Component } from "preact";

export default class NavigationBar extends Component {
    navRef: HTMLElement;

    componentDidMount() {
        this.setBackground();
    }

    setBackground() {
		if (currentPage.value.RelativeNavbarImageURLs !== undefined) {
			this.navRef.style.backgroundImage = `url("${currentPage.value.RelativeNavbarImageURLs[Math.floor(Math.random() * currentPage.value.RelativeNavbarImageURLs.length)]}")`;
		}
	}

    render({ children }) {
        return (
            <nav ref={el => this.navRef = el}>
                <div id="nav-scroller">
                    <div id="nav-buttons">
                        {children}
                    </div>
                </div>
            </nav>
        );
    }
}