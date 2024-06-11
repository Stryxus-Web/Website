if (process.env.NODE_ENV === "development") import("preact/debug");
import "./PageShell.sass";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { IStaticMethods } from "preline/preline";
import { Component } from "preact";
import { loadFull } from "tsparticles";
import { initParticlesEngine } from "@tsparticles/preact";

import { PageContextProvider } from "../../renderer/usePageContext.tsx";
import { updateMediaQueries } from "../../data/states/MediaQueryStates.tsx";

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
	particlesInitialized: boolean,
}

export default class PageShell extends Component<ComProps, ComState> {

	constructor() {
		super();
		this.state = {
			particlesInitialized: false,
		}

        initParticlesEngine(async engine => {
            await loadFull(engine);
        }).then(() => {
            this.setState({
				...this.state,
                particlesInitialized: true,
            });
        });
	}

	componentDidMount() {
		// Dependency Initialisation
		gsap.registerPlugin(useGSAP);
		import("preline/preline").then(() => {
			window.HSStaticMethods.autoInit();
		});
	}

	render({ children, pageContext }) {
		if (typeof window !== "undefined") {
			window.addEventListener("resize", updateMediaQueries);
			updateMediaQueries();
		}

		return (
			<PageContextProvider pageContext={pageContext}>
				<div></div>
			</PageContextProvider>
		);
	}
}
