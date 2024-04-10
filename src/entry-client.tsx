import { hydrate } from "preact-iso";

import App from './App.tsx';

declare global {
	interface Window {
	  	__data__: any;
	}
}

let data;
if (typeof window !== 'undefined') {
    data = window.__data__;
}
 
hydrate(<App data={data} />, document.getElementById("app"));