import { client } from '@/libs/client';
import Layout from '@/components/layout';
import { formattedDate } from '@/utils/dateFormat';
import { useRouter } from 'next/router';
import { type } from 'os';
import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';

export default function Resume({ resume }) {
    useEffect(() => {
        // scriptを読み込み
        const script = document.createElement('script');
        script.src = "//cdn.iframe.ly/embed.js";
        document.body.appendChild(script);
        // アンマウント時に一応scriptタグを消しておく
        return () => {
          document.body.removeChild(script);
        }
     }, [])

    return (
        <Layout>
            <div>
                <h1>職務経歴書</h1>
                <div>
                    <p>最終更新: {formattedDate(resume.updatedAt)}</p>
                </div>
                <div className="post-body" 
                    dangerouslySetInnerHTML={{
                    __html: `${resume.body}`,
                    }}
                />
            </div>
        </Layout>
    );
}

// export const getStaticPaths = async () => {
//     const data = await client.get({ endpoint: "posts" });
    
//     const paths = data.contents.map((content) => `/posts/${content.id}`);
//     return { paths, fallback: false };
// }

export const getStaticProps = async (context) => {
    const data = await client.get({ endpoint: "resume"});

    return {
        props: {
            resume: data,
        },
    };
}