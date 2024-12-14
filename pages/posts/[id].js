import { client } from '@/libs/client';
import Layout from '@/components/layout';
import { formattedDate } from '@/utils/dateFormat';
import { useRouter } from 'next/router';
import { type } from 'os';
import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';

export default function PostId({ post }) {
    const router = useRouter();
    const description = post.body.substring(0, 50) + "…";
    const currentUrl = "https://hiragram.app" + router.asPath;

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
            <Head>
                <title>{post.title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:image" content="https://avatars.githubusercontent.com/u/3433324?v=4" />
            </Head>            
            <div>
                <div className="post-header">
                    <h1 className="post-title">{post.title}</h1>
                    <p className="post-tag-container">
                        {post.tags.map((tag) => (
                            <span className={`tag-${tag} label`} key={tag}>{tag}</span>
                        ))}
                    </p>
                    <p className="datetime">{formattedDate(post.publishedAt)}</p>
                    <hr />
                </div>
                
                <div className="post-body" 
                    dangerouslySetInnerHTML={{
                    __html: `${post.body}`,
                    }}
                />

                <div className="post-share">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: `
                            <a href="https://b.hatena.ne.jp/entry/" class="hatena-bookmark-button" data-hatena-bookmark-layout="vertical-normal" data-hatena-bookmark-lang="ja" title="このエントリーをはてなブックマークに追加">
                                <img src="https://b.st-hatena.com/images/v4/public/entry-button/button-only@2x.png" alt="このエントリーをはてなブックマークに追加" width="20" height="20" style="border: none;" />
                            </a>
                            <script type="text/javascript" src="https://b.st-hatena.com/js/bookmark_button.js" charset="utf-8" async="async"></script>
                            `,
                        }}
                    />
                    <p>
                        <span className="x-share-button">
                        <a 
                            href={"https://x.com/intent/post?text=" + post.title + " " + currentUrl + " @hiragram"}
                            target="_blank"
                        >
                            <span className="x-logo">𝕏</span>
                            <span className="x-label">Post</span>
                        </a>
                        </span>
                    </p>
                </div>
            </div>
        </Layout>
    );
}

export const getStaticPaths = async () => {
    const data = await client.get({ endpoint: "posts" });
    
    const paths = data.contents.map((content) => `/posts/${content.id}`);
    return { paths, fallback: false };
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const data = await client.get({ endpoint: "posts", contentId: id });

    return {
        props: {
            post: data,
        },
    };
}