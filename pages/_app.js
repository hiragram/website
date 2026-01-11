import "../styles/global.css";
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-cmake';
import 'prismjs/themes/prism-tomorrow.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';


export default function App({ Component, pageProps }) {
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = () => {
            Prism.highlightAll();
        };

        Prism.highlightAll();

        router.events.on("routeChangeComplete", handleRouteChange);

        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router]);

    return <Component {...pageProps} />;
}
