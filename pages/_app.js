import "../styles/global.css";
import 'prism-themes/themes/prism-dracula.css'; // Prism.jsのテーマCSSをインポート
import 'prismjs'; // Prism.jsのメインスクリプト
import 'prismjs/components/prism-javascript'; // 必要な言語のサポート
import 'prismjs/components/prism-css'; // 必要に応じて他の言語もインポート
import 'prismjs/components/prism-swift';
import { useEffect } from 'react';


export default function App({ Component, pageProps }) {
    useEffect(() => {
        // Prism.jsを初期化してシンタックスハイライトを適用
        Prism.highlightAll();
    }, []);

    return <Component {...pageProps} />;
}
