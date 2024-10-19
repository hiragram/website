import "../styles/global.css";
import hljs from 'highlight.js';
import 'highlight.js/styles/kimbie-dark.css';
import { useEffect } from 'react';


export default function App({ Component, pageProps }) {
    useEffect(() => {
        hljs.highlightAll();
    }, []);

    return <Component {...pageProps} />;
}
