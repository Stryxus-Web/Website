import "./style.sass";

import { useEffect } from "preact/hooks";

import { init } from "../../../wasm/star-prism/pkg/star_prism.js";

export default function StarPrism() {

	useEffect(() => {
		init(0);
	}, []);

	return (
		<div class="page-starprism">
			   
		</div>
	);
}
