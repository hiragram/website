import "../styles/global.css";
import hljs from 'highlight.js';
import 'highlight.js/styles/kimbie-dark.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';


export default function App({ Component, pageProps }) {
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = (url) => {
            hljs.highlightAll();
        };

        router.events.on("routeChangeComplete", handleRouteChange);

        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router]);

    return <Component {...pageProps} />;
}
