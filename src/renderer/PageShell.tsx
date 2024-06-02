if (process.env.NODE_ENV === "development") import("preact/debug");
import "./PageShell.sass";
import { PageContextProvider } from "./usePageContext.tsx";
import { Link } from "../components/link.tsx";

import NavigationBar from "../components/NavigationBar/NavigationBar.tsx";
import NavigationBarButton from "../components/NavigationBar/NavigationBarButton/NavigationBarButton.tsx";
import SettingsMenu from "../components/SettingsMenu/SettingsMenu.tsx";
import { NavPage, currentPage, routerPages } from "../data/states/Routing.tsx";

import { isBreakpointDownLG, updateMediaQueries} from "../data/states/MediaQueries.tsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { IStaticMethods } from "preline/preline";

import Img_Avatar from "../assets/img/avatar.png?format=avif&imagetools";
import faCaretRight from "../assets/img/fa/solid/caret-right.svg";
import faGear from "../assets/img/fa/solid/gear.svg";
import { Component } from "preact";

declare global {
	interface Window {
	  	HSStaticMethods: IStaticMethods;
	}
}

interface ComProps {
	children: any,
	pageContext: any,
}

interface ComState {
	isSettingsMenuVisible: boolean,
}

// TODO: Dont rely on gsap to set the mobile nav/header/footer style.
// TODO: Redesign home page with particlesjs.
// TODO: Fix bug which doesnt close the navbar when selecting a page on mobile.
// TODO: The navbar doesnt close on page select on mobile in most cases.
// TODO: The settings menu button is broken on mobile.
// TODO: Add a fully functional StarPrism.
// TODO: Update the settings menu with a setting to disable WASM.
// TODO: Remove Git commits from the settings menu.
// TODO: Add setting to disallow 3rd party embed's on the website, like Apple Music, Youtube and others.
// TODO: Add ability to the navigation frame to completely minimise when navigating to a WASM tool to give the illusion of a standalone website. Add a subtle back arrow button in the top right.
// TODO: Add an image transcoding WASM system to the Admin page for photography uploading.
// TODO: LazyLoad all assets declared in Routing.tsx.

export default class PageShell extends Component<ComProps, ComState> {
	mobileButtonElRef: HTMLDivElement;
	navElRef: NavigationBar;
	mainElRef: HTMLElement;
	borderElRef: HTMLDivElement;
	headerElRef: HTMLDivElement;
	footerElRef: HTMLDivElement;

	avatarLinkContainerRef: HTMLDivElement;

	constructor() {
		super();
		this.state ={
			isSettingsMenuVisible: false
		}
	}

	componentDidMount() {
		gsap.registerPlugin(useGSAP);

		import("preline/preline").then(() => {
			window.HSStaticMethods.autoInit();
		});

		let isFirstRender = true;
		let isNavbarOpen = !isBreakpointDownLG.value;
		const toggle = (() => {
			if (isBreakpointDownLG.value) {
				if (!isNavbarOpen) open(this.mobileButtonElRef, this.mainElRef, this.borderElRef, this.headerElRef, this.footerElRef);
				else close(this.mobileButtonElRef, this.mainElRef, this.borderElRef, this.headerElRef, this.footerElRef);
			}
			else open(this.mobileButtonElRef, this.mainElRef, this.borderElRef, this.headerElRef, this.footerElRef);
			isFirstRender = false;
		});

		isBreakpointDownLG.registerListener((val: boolean) => {
			if (val) close(this.mobileButtonElRef, this.mainElRef, this.borderElRef, this.headerElRef, this.footerElRef);
			else open(this.mobileButtonElRef, this.mainElRef, this.borderElRef, this.headerElRef, this.footerElRef);
		});

		function open(MButtonElRef: HTMLDivElement, MainElRef: HTMLElement, BorderElRef: HTMLDivElement, HeaderElRef: HTMLDivElement, FooterElRef: HTMLDivElement) {
			isNavbarOpen = true;
			gsap.to(`#${MButtonElRef.id}`.toLocaleLowerCase(), { ease: "sine.out", duration: isFirstRender ? 0 : 0.3, translateX: "-18px" });
			gsap.to(MainElRef.tagName.toLocaleLowerCase(), { ease: "sine.out", duration: isFirstRender ? 0 : 0.3, top: "16px", bottom: "16px", left: "107px" });
			gsap.to(`#${BorderElRef.id}`.toLocaleLowerCase(), { ease: "sine.out", duration: isFirstRender ? 0 : 0.3, top: "8px", bottom: "8px", left: "99px", opacity: 1 });
			gsap.to(`#${HeaderElRef.id}`.toLocaleLowerCase(), { ease: "sine.out", duration: isFirstRender ? 0 : 0.3, translateY: "0px" });
			gsap.to(`#${FooterElRef.id}`.toLocaleLowerCase(), { ease: "sine.out", duration: isFirstRender ? 0 : 0.3, translateY: "0px"});
		}

		function close(MButtonElRef: HTMLDivElement, MainElRef: HTMLElement, BorderElRef: HTMLDivElement, HeaderElRef: HTMLDivElement, FooterElRef: HTMLDivElement) {
			isNavbarOpen = false;
			gsap.to(`#${MButtonElRef.id}`.toLocaleLowerCase(), { ease: "sine.out", duration: isFirstRender ? 0 : 0.3, translateX: "0px" });
			gsap.to(MainElRef.tagName.toLocaleLowerCase(), { ease: "sine.out", duration: isFirstRender ? 0 : 0.3, top: "0px", bottom: "0px", left: "18px" });
			gsap.to(`#${BorderElRef.id}`.toLocaleLowerCase(), { ease: "sine.out", duration: isFirstRender ? 0 : 0.3, top: "0px", bottom: "0px", left: "0px", opacity: 0 });
			gsap.to(`#${HeaderElRef.id}`.toLocaleLowerCase(), { ease: "sine.out", duration: isFirstRender ? 0 : 0.3, translateY: "-95px" });
			gsap.to(`#${FooterElRef.id}`.toLocaleLowerCase(), { ease: "sine.out", duration: isFirstRender ? 0 : 0.3, translateY: "95px" });
		}

		this.mobileButtonElRef.addEventListener("click", toggle);
		this.avatarLinkContainerRef.addEventListener("click", toggle);
		for (let item of document.getElementsByClassName("nav-button")) {
			item.addEventListener("click", toggle);
		}

		toggle();
		this.setBackground();
	}

	setBackground() {
		if (currentPage.value.RelativeNavbarImageURLs !== undefined) {
			this.mainElRef.style.backgroundImage = `url("${currentPage.value.RelativeNavbarImageURLs[Math.floor(Math.random() * currentPage.value.RelativeNavbarImageURLs.length)]}")`;
		}
	}

	render({ children, pageContext }) {

		if (typeof window !== "undefined") {
			currentPage.value = routerPages.find(x => x.RelativeLink == (window.location.pathname.length == 0 ? "/" : window.location.pathname));
			window.addEventListener("resize", updateMediaQueries);
			updateMediaQueries();
		}

		return (
			<PageContextProvider pageContext={pageContext}>
				<NavigationBar>
				{
					routerPages.map((page: NavPage) =>
					{
						if (!page.Hidden) {
							return (
								<NavigationBarButton icon={page.Icon} relativeLink={page.RelativeLink} />
							);
						}
					})
				}
				</NavigationBar>
				<div ref={el => this.mobileButtonElRef = el} id="m-button">
					<img src={faCaretRight} alt="Mobile Navbar Button" />
				</div>
				<div id="header" class="w-full" ref={el => this.headerElRef = el}>
					<div class="cover">
						<div ref={el => this.avatarLinkContainerRef = el}>
							<Link id="avatar-img-container" className="active" href={"/"}>
								<img id="avatar-img" width="48px" height="48px" src={Img_Avatar} alt="Home Page" draggable={false} />
							</Link>
						</div>
					</div>
				</div>
				<main ref={el => this.mainElRef = el} class="w-full">
					{children}
				</main>
				<div ref={el => this.borderElRef = el} id="border"></div>
				<div id="footer" class="w-full" ref={el => this.footerElRef = el}>
					<div class="cover">
						<button id="settings-button" title="Settings Menu Button" onClick={() => this.setState({ ...this.state, isSettingsMenuVisible: !this.state.isSettingsMenuVisible })}>
							<img src={faGear} alt="Settings Menu" />
						</button>
					</div>
				</div>
				{this.state.isSettingsMenuVisible && <SettingsMenu />}
			</PageContextProvider>
		);
	}
}
