if (import.meta.env.MODE === "development") import("preact/debug");
import "./App.sass";

import { Component, createRef } from "preact";
import { LocationProvider, hydrate, prerender as ssr } from "preact-iso";
import { MutableRef, useEffect, useState } from "preact/hooks";
import { Router, Route, RouterOnChangeArgs } from "preact-router";
import { Link } from "preact-router/match";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { IStaticMethods } from "preline/preline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faGear } from "@fortawesome/free-solid-svg-icons";

import { routerPages, NavPage, currentPage } from "./data/Globals.tsx";
import { isBreakpointDownLG, isBreakpointDownMD, isBreakpointDownSM, isBreakpointDownXL, isBreakpointDown2XL, 
	isBreakpointOnlyLG, isBreakpointOnlyMD, isBreakpointOnlySM, isBreakpointOnlyXL, isBreakpointOnly2XL, 
	isBreakpointUpLG, isBreakpointUpMD, isBreakpointUpSM, isBreakpointUpXL, isBreakpointUp2XL, 
	mq_lg, mq_md, mq_sm, mq_xl, mq_2xl } from "./data/MediaQueries.tsx";

import NavigationBar from "./components/NavigationBar/NavigationBar.tsx";
import NavigationBarButton from "./components/NavigationBar/NavigationBarButton/NavigationBarButton.tsx";
import SettingsMenu from "./components/SettingsMenu/SettingsMenu.tsx";

import Art from "./pages/Art/Art";
import Blog from "./pages/Blog/Blog";
import Gaming from "./pages/Gaming/Gaming";
import Health from "./pages/Health/Health";
import Home from "./pages/Home/Home";
import Media from "./pages/Media/Media";
import Music from "./pages/Music/Music";
import Projects from "./pages/Projects/Projects";
import StarPrism from "./pages/Projects/StarPrism/StarPrism.tsx";
import AndroidSystemBridge from "./pages/Projects/ASB/AndroidSystemBridge.tsx";
import Setups from "./pages/Setups/Setups";
import Admin from "./pages/Admin/Admin";
import NotFound from "./pages/_404.js";

import Img_Avatar from "./assets/img/avatar.png";

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
// TODO: Convert to Server-Side Rendering.

declare global {
	interface Window {
	  	HSStaticMethods: IStaticMethods;
	}
}

interface ComProps {
	
}

interface ComState {

}

export default class App extends Component<ComProps, ComState> {
	mobileButtonElRef: MutableRef<HTMLDivElement> = createRef<HTMLDivElement>();
	navElRef: MutableRef<NavigationBar> = createRef<NavigationBar>();
	mainElRef: MutableRef<HTMLDivElement> = createRef<HTMLDivElement>();
	borderElRef: MutableRef<HTMLDivElement> = createRef<HTMLDivElement>();
	headerElRef: MutableRef<HTMLDivElement> = createRef<HTMLDivElement>();
	footerElRef: MutableRef<HTMLDivElement> = createRef<HTMLDivElement>();

	constructor(props: ComProps) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
		
    }

    componentWillUnmount() {

    }

	updateMediaQueries() {
		isBreakpointUpSM.value = window.matchMedia(`(min-width: ${mq_sm}px)`).matches;
		isBreakpointUpMD.value = window.matchMedia(`(min-width: ${mq_md}px)`).matches;
		isBreakpointUpLG.value = window.matchMedia(`(min-width: ${mq_lg}px)`).matches;
		isBreakpointUpXL.value = window.matchMedia(`(min-width: ${mq_xl}px)`).matches;
		isBreakpointUp2XL.value = window.matchMedia(`(min-width: ${mq_2xl}px)`).matches;
	
		isBreakpointDownSM.value = window.matchMedia(`(max-width: ${mq_sm - 0.02}px)`).matches;
		isBreakpointDownMD.value = window.matchMedia(`(max-width: ${mq_md - 0.02}px)`).matches;
		isBreakpointDownLG.value = window.matchMedia(`(max-width: ${mq_lg - 0.02}px)`).matches;
		isBreakpointDownXL.value = window.matchMedia(`(max-width: ${mq_xl - 0.02}px)`).matches;
		isBreakpointDown2XL.value = window.matchMedia(`(max-width: ${mq_2xl - 0.02}px)`).matches;
	
		isBreakpointOnlySM.value = window.matchMedia(`(min-width: ${mq_sm}px) and (max-width: ${mq_sm - 0.02})`).matches;
		isBreakpointOnlyMD.value = window.matchMedia(`(min-width: ${mq_md}px) and (max-width: ${mq_md - 0.02})`).matches;
		isBreakpointOnlyLG.value = window.matchMedia(`(min-width: ${mq_lg}px) and (max-width: ${mq_lg - 0.02})`).matches;
		isBreakpointOnlyXL.value = window.matchMedia(`(min-width: ${mq_xl}px) and (max-width: ${mq_xl - 0.02})`).matches;
		isBreakpointOnly2XL.value = window.matchMedia(`(min-width: ${mq_2xl}px) and (max-width: ${mq_2xl - 0.02})`).matches;
	}

	setNavBackground() {
		if (this.navElRef.current && this.mainElRef.current) {
			const imgurls: string[] | undefined = currentPage.value.RelativeNavbarImageURLs;
			if (imgurls) {
				this.navElRef.current.getNavElRef().style.backgroundImage = `url("${imgurls[Math.floor(Math.random() * imgurls.length)]}")`;
				this.mainElRef.current.style.backgroundImage = `url("${imgurls[Math.floor(Math.random() * imgurls.length)]}")`;
			}
		}
	}

	render() {
		const [isSettingsMenuVisible, setSettingsMenuIsVisible] = useState(false);

		if (typeof window !== "undefined") {
			currentPage.value = routerPages.find(x => x.RelativeLink == (window.location.pathname.length == 0 ? "/" : window.location.pathname));

			useEffect(() => {
				import("preline/preline").then(() => {
					window.HSStaticMethods.autoInit();
				});
			}, [window.location.pathname]);

			gsap.registerPlugin(useGSAP);

			window.addEventListener("resize", this.updateMediaQueries);
			this.updateMediaQueries();
	
			useGSAP((context, contextSafe) => {
				let isFirstRender = true;
				let isNavbarOpen = !isBreakpointDownLG.value;
				const toggle = contextSafe(() => {
					if (isBreakpointDownLG.value) {
						if (!isNavbarOpen) open(this.mobileButtonElRef.current, this.mainElRef.current, this.borderElRef.current, this.headerElRef.current, this.footerElRef.current);
						else close(this.mobileButtonElRef.current, this.mainElRef.current, this.borderElRef.current, this.headerElRef.current, this.footerElRef.current);
					}
					else open(this.mobileButtonElRef.current, this.mainElRef.current, this.borderElRef.current, this.headerElRef.current, this.footerElRef.current);
					isFirstRender = false;
				});

				isBreakpointDownLG.registerListener((val: boolean) => {
					if (val) close(this.mobileButtonElRef.current, this.mainElRef.current, this.borderElRef.current, this.headerElRef.current, this.footerElRef.current);
					else open(this.mobileButtonElRef.current, this.mainElRef.current, this.borderElRef.current, this.headerElRef.current, this.footerElRef.current);
				});

				function open(MButtonElRef: HTMLDivElement, MainElRef: HTMLDivElement, BorderElRef: HTMLDivElement, HeaderElRef: HTMLDivElement, FooterElRef: HTMLDivElement) {
					isNavbarOpen = true;
					gsap.to(`#${MButtonElRef.id}`.toLocaleLowerCase(), { ease: "sine.out", duration: isFirstRender ? 0 : 0.3, translateX: "-18px" });
					gsap.to(MainElRef.tagName.toLocaleLowerCase(), { ease: "sine.out", duration: isFirstRender ? 0 : 0.3, top: "16px", bottom: "16px", left: "107px" });
					gsap.to(`#${BorderElRef.id}`.toLocaleLowerCase(), { ease: "sine.out", duration: isFirstRender ? 0 : 0.3, top: "8px", bottom: "8px", left: "99px", opacity: 1 });
					gsap.to(`#${HeaderElRef.id}`.toLocaleLowerCase(), { ease: "sine.out", duration: isFirstRender ? 0 : 0.3, translateY: "0px" });
					gsap.to(`#${FooterElRef.id}`.toLocaleLowerCase(), { ease: "sine.out", duration: isFirstRender ? 0 : 0.3, translateY: "0px"});
				}
	
				function close(MButtonElRef: HTMLDivElement, MainElRef: HTMLDivElement, BorderElRef: HTMLDivElement, HeaderElRef: HTMLDivElement, FooterElRef: HTMLDivElement) {
					isNavbarOpen = false;
					gsap.to(`#${MButtonElRef.id}`.toLocaleLowerCase(), { ease: "sine.out", duration: isFirstRender ? 0 : 0.3, translateX: "0px" });
					gsap.to(MainElRef.tagName.toLocaleLowerCase(), { ease: "sine.out", duration: isFirstRender ? 0 : 0.3, top: "0px", bottom: "0px", left: "18px" });
					gsap.to(`#${BorderElRef.id}`.toLocaleLowerCase(), { ease: "sine.out", duration: isFirstRender ? 0 : 0.3, top: "0px", bottom: "0px", left: "0px", opacity: 0 });
					gsap.to(`#${HeaderElRef.id}`.toLocaleLowerCase(), { ease: "sine.out", duration: isFirstRender ? 0 : 0.3, translateY: "-95px" });
					gsap.to(`#${FooterElRef.id}`.toLocaleLowerCase(), { ease: "sine.out", duration: isFirstRender ? 0 : 0.3, translateY: "95px" });
				}
	
				this.mobileButtonElRef.current.addEventListener("click", toggle);
				// TODO: Figure out how to use references instead, the document get way feels bad. This has type issues so addEventListener doesnt exist.
				document.getElementById("avatar-img-container").addEventListener("click", toggle);
				for (let item of document.getElementsByClassName("nav-button")) {
					item.addEventListener("click", toggle);
				}

				toggle();
				// TODO: Synchronise the router with my own page state to get which page is routed too.
				this.setNavBackground();
			}, { });
		}

		return (
			<LocationProvider>
				<NavigationBar ref={this.navElRef}>
				{
					routerPages.map((page: NavPage) =>
					{
						if (!page.Hidden) {
							return (
								<NavigationBarButton title={page.Name} relativeLink={page.RelativeLink} icon={page.Icon} />
							);
						}
					})
                }
				</NavigationBar>
				<div ref={this.mobileButtonElRef} id="m-button">
					<FontAwesomeIcon icon={faCaretRight} />
				</div>
				<div id="header" class="w-full" ref={this.headerElRef}>
					<div class="cover">
						<Link id="avatar-img-container" activeClassName="active" href={"/"}>
							<img id="avatar-img" width="48px" height="48px" src={Img_Avatar} alt="Home Page" draggable={false} />
						</Link>
					</div>
				</div>
				<main ref={this.mainElRef} class="w-full">
					<Router onChange={(args: RouterOnChangeArgs<Record<string, string>>) => {
						if (typeof window !== "undefined") {
							currentPage.value = routerPages.find(x => x.RelativeLink == (window.location.pathname.length == 0 ? "/" : window.location.pathname));
							this.setNavBackground();
						}
					}}>
						<Route path="/" component={Home} />
						<Route path="/art" component={Art} />
						<Route path="/blog" component={Blog} />
						<Route path="/gaming" component={Gaming} />
						<Route path="/health" component={Health} />
						<Route path="/media" component={Media} />
						<Route path="/music" component={Music} />
						<Route path="/projects" component={Projects} />
						<Route path="/projects/starprism" component={StarPrism} />
						<Route path="/projects/asb" component={AndroidSystemBridge} />
						<Route path="/setups" component={Setups} />

						<Route path="/admin" component={Admin} />

						<Route default component={NotFound} />
					</Router>
				</main>
				<div ref={this.borderElRef} id="border"></div>
				<div id="footer" class="w-full" ref={this.footerElRef}>
					<div class="cover">
						<button id="settings-button" title="Settings Menu Button" onClick={() => setSettingsMenuIsVisible(!isSettingsMenuVisible)}>
							<FontAwesomeIcon icon={faGear} />
						</button>
					</div>
				</div>
				{isSettingsMenuVisible && <SettingsMenu />}
			</LocationProvider>
		);
	}
}

// Preact

if (typeof window !== "undefined") {
	hydrate(<App />, document.getElementById("app"));
}

export async function prerender(data: any) {
	return await ssr(<App {...data} />);
}
