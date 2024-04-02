import './App.sass';
import 'preact/debug';

import Img_Avatar from './assets/img/avatar.png';

import { Component, createRef } from 'preact';
import { LocationProvider, Router, Route, hydrate, prerender as ssr } from 'preact-iso';
import { MutableRef } from 'preact/hooks';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { Pages, NavPage } from './data/Globals';
import { isBreakpointDownLG, isBreakpointDownMD, isBreakpointDownSM, isBreakpointDownXL, isBreakpointDownXXL, 
	isBreakpointOnlyLG, isBreakpointOnlyMD, isBreakpointOnlySM, isBreakpointOnlyXL, isBreakpointOnlyXXL, 
	isBreakpointUpLG, isBreakpointUpMD, isBreakpointUpSM, isBreakpointUpXL, isBreakpointUpXXL, 
	mq_lg, mq_md, mq_sm, mq_xl, mq_xxl } from './data/MediaQueries';

import NavigationBar from './components/NavigationBar/NavigationBar';
import NavigationBarButton from './components/NavigationBar/NavigationBarButton/NavigationBarButton';
import SettingsMenu from './components/SettingsMenu/SettingsMenu';

import Art from './pages/Art/Art';
import Blog from './pages/Blog/Blog';
import Gaming from './pages/Gaming/Gaming';
import Health from './pages/Health/Health';
import Home from './pages/Home/Home';
import Media from './pages/Media/Media';
import Music from './pages/Music/Music';
import Projects from './pages/Projects/Projects';
import Setups from './pages/Setups/Setups';
import Admin from './pages/Admin/Admin'
import NotFound from './pages/_404.js';

interface ComProps {
	
}

interface ComState {
	MButtonElRef: MutableRef<HTMLDivElement>,
	MainElRef: MutableRef<HTMLDivElement>,
	BorderElRef: MutableRef<HTMLDivElement>,
	
	IsSettingsMenuVisible: boolean,
}

export default class App extends Component<ComProps, ComState> {

	constructor(props: ComProps) {
        super(props);
        this.state = {
			MButtonElRef: createRef<HTMLDivElement>(),
			MainElRef: createRef<HTMLDivElement>(),
			BorderElRef: createRef<HTMLDivElement>(),

			IsSettingsMenuVisible: false,
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
		isBreakpointUpXXL.value = window.matchMedia(`(min-width: ${mq_xxl}px)`).matches;
	
		isBreakpointDownSM.value = window.matchMedia(`(max-width: ${mq_sm - 0.02}px)`).matches;
		isBreakpointDownMD.value = window.matchMedia(`(max-width: ${mq_md - 0.02}px)`).matches;
		isBreakpointDownLG.value = window.matchMedia(`(max-width: ${mq_lg - 0.02}px)`).matches;
		isBreakpointDownXL.value = window.matchMedia(`(max-width: ${mq_xl - 0.02}px)`).matches;
		isBreakpointDownXXL.value = window.matchMedia(`(max-width: ${mq_xxl - 0.02}px)`).matches;
	
		isBreakpointOnlySM.value = window.matchMedia(`(min-width: ${mq_sm}px) and (max-width: ${mq_sm - 0.02})`).matches;
		isBreakpointOnlyMD.value = window.matchMedia(`(min-width: ${mq_md}px) and (max-width: ${mq_md - 0.02})`).matches;
		isBreakpointOnlyLG.value = window.matchMedia(`(min-width: ${mq_lg}px) and (max-width: ${mq_lg - 0.02})`).matches;
		isBreakpointOnlyXL.value = window.matchMedia(`(min-width: ${mq_xl}px) and (max-width: ${mq_xl - 0.02})`).matches;
		isBreakpointOnlyXXL.value = window.matchMedia(`(min-width: ${mq_xxl}px) and (max-width: ${mq_xxl - 0.02})`).matches;
	}

	render() {
		gsap.registerPlugin(useGSAP);

		window.addEventListener('resize', this.updateMediaQueries);
		this.updateMediaQueries();

		useGSAP((context, contextSafe) => {
			let isFirstRender = true;
			let isNavbarOpen = !isBreakpointDownLG.value;
			const toggle = contextSafe(() => {
				if (isBreakpointDownLG.value) {
					if (isFirstRender ? isNavbarOpen : isNavbarOpen = !isNavbarOpen) open(this.state.MButtonElRef.current, this.state.MainElRef.current, this.state.BorderElRef.current);
					else close(this.state.MButtonElRef.current, this.state.MainElRef.current, this.state.BorderElRef.current);
				}
				else this.state.MButtonElRef.current.style.display = 'none';
				isFirstRender = false;
			});

			isBreakpointDownLG.registerListener((val: boolean) => {
				if (val) close(this.state.MButtonElRef.current, this.state.MainElRef.current, this.state.BorderElRef.current);
				else open(this.state.MButtonElRef.current, this.state.MainElRef.current, this.state.BorderElRef.current);
			});

			function open(MButtonElRef: HTMLDivElement, MainElRef: HTMLDivElement, BorderElRef: HTMLDivElement) {
				MButtonElRef.style.display = 'none';
				gsap.to(MainElRef.tagName.toLocaleLowerCase(), { ease: 'sine.out', duration: isFirstRender ? 0 : 0.33, top: '16px', bottom: '16px', left: '108px' });
				gsap.to(`#${BorderElRef.id}`.toLocaleLowerCase(), { ease: 'sine.out', duration: isFirstRender ? 0 : 0.33, top: '8px', bottom: '8px', left: '99px' });
			}

			function close(MButtonElRef: HTMLDivElement, MainElRef: HTMLDivElement, BorderElRef: HTMLDivElement) {
				gsap.to(MainElRef.tagName.toLocaleLowerCase(), { ease: 'sine.out', duration: isFirstRender ? 0 : 0.33, top: '0px', bottom: '0px', left: '18px' });
				gsap.to(`#${BorderElRef.id}`.toLocaleLowerCase(), { ease: 'sine.out', duration: isFirstRender ? 0 : 0.33, top: '0px', bottom: '0px', left: '0px' });
				MButtonElRef.style.display = 'unset';
			}

			this.state.MButtonElRef.current.addEventListener('click', toggle);
			// TODO: Figure out how to use references instead, the document get way feels bad. This has type issues so addEventListener doesnt exist.
			document.getElementById('avatar-img-container').addEventListener('click', toggle);
			for (let item of document.getElementsByClassName('nav-button')) {
				item.addEventListener('click', toggle);
			}
			
			toggle();
		}, { });

		return (
			<LocationProvider>
				<NavigationBar>
				{
					Pages.slice(1).map((page: NavPage) =>
					{
						return (
							<NavigationBarButton title={page.Name} relativeLink={page.RelativeLink} iconName={page.IconName} />
						);
					})
                }
				</NavigationBar>
				<div ref={this.state.MButtonElRef} id="m-button">
					<i class="bi bi-caret-right-fill"></i>
				</div>
				<div id="header" class="container-fluid">
					<div class="row justify-content-center">
						<div class="col">
							<a id="avatar-img-container" class="" href={"/"}>
								<img src={Img_Avatar} alt="Home Page" />
							</a>
						</div>
					</div>
				</div>
				<main ref={this.state.MainElRef} class="container-fluid">
					<Router>
						<Route path="/" component={Home} />
						<Route path="/art" component={Art} />
						<Route path="/blog" component={Blog} />
						<Route path="/gaming" component={Gaming} />
						<Route path="/health" component={Health} />
						<Route path="/media" component={Media} />
						<Route path="/music" component={Music} />
						<Route path="/projects" component={Projects} />
						<Route path="/setups" component={Setups} />

						<Route path="/admin" component={Admin} />

						<Route default component={NotFound} />
					</Router>
				</main>
				<div ref={this.state.BorderElRef} id="border"></div>
				<div id="footer" class="container-fluid">
					<div class="row">
						<div class="col">
							<div class="row">
								<div class="col">
									<i class="bi bi-gear-wide-connected"></i>
								</div>
							</div>
						</div>
					</div>
				</div>
				{SettingsMenuComponent}
			</LocationProvider>
		);
	}
}

function SettingsMenuComponent() {
	if (this.state.IsSettingsMenuVisible)
	{
		return (
			<SettingsMenu />
		);
	}
}

// Preact

if (typeof window !== 'undefined') {
	hydrate(<App />, document.getElementById('app'));
}

export async function prerender(data: any) {
	return await ssr(<App {...data} />);
}
