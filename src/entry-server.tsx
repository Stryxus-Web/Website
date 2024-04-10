import { render as renderToString } from 'preact-render-to-string';

import App from './App.tsx';

export const prerender = (data: any) => {
    return renderToString(<App data={data} />);
};