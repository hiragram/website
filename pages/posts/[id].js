import { getAllPosts, getPostById } from '@/libs/posts';
import Layout from '@/components/layout';
import { formattedDate } from '@/utils/dateFormat';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';

export default function PostId({ post }) {
    const router = useRouter();
    const description = post.body.substring(0, 50) + "…";
    const currentUrl = "https://hiragram.app" + router.asPath;

    useEffect(() => {
        HBBlogParts.start && HBBlogParts.start();

        // iframely scriptを読み込み
        const iframelyScript = document.createElement('script');
        iframelyScript.src = "//cdn.iframe.ly/embed.js";
        document.body.appendChild(iframelyScript);

        // Twitter埋め込みを読み込み/再読み込み
        if (window.twttr && window.twttr.widgets) {
            // 既に読み込み済みなら再実行
            window.twttr.widgets.load();
        } else {
            // まだ読み込まれてなければスクリプトを追加
            const twitterScript = document.createElement('script');
            twitterScript.src = "https://platform.twitter.com/widgets.js";
            twitterScript.async = true;
            document.body.appendChild(twitterScript);
        }

        // アンマウント時にiframelyのscriptタグを消しておく
        return () => {
          document.body.removeChild(iframelyScript);
        }
     }, [])

    return (
        <Layout>
            <Script type="text/javascript" strategy='beforeInteractive'>
                {`
                    window.HBBlogParts = window.HBBlogParts || {};
                    
                    // HBBlogParts.debug = true;

                    // ******************************************************************* //
                    // copied from bookmark_blogparts.js
                    // ******************************************************************* //
                    HBBlogParts._alreadyShown = {};
                    HBBlogParts.shownPermalinks = {};
                    HBBlogParts.catchCount = 0;

                    // Settings
                    HBBlogParts.Design = null;
                    HBBlogParts.useUserCSS = false;
                    HBBlogParts.listPageCommentLimit = 3;
                    HBBlogParts.permalinkCommentLimit = 5;

                    HBBlogParts.API_DOMAIN = 'https://b.hatena.ne.jp';
                    HBBlogParts.STATIC_DOMAIN = 'https://b.st-hatena.com';
                    HBBlogParts.ICON_DOMAIN = 'https://cdn.profile-image.st-hatena.com';
                    // ******************************************************************* //

                    HBBlogParts.commentInsertSelector = [ '#post-comment' ];
                    HBBlogParts.permalinkSelector = '#permalink';
                    HBBlogParts.permalinkAttribute = 'href';
                    HBBlogParts.permalinkPathRegexp = /\\/posts\\//;
                    HBBlogParts.insertPosition = "before";
                    HBBlogParts.permalinkURI = 'https://hiragram.app/posts/${post.id}';
                    HBBlogParts.permalinkCommentLimit = 10;
                    HBBlogParts.useUserCSS = true;
                `}
            </Script>
            <Script type='text/javascript' src="https://b.hatena.ne.jp/js/bookmark_blogparts.js" strategy="afterInteractive" />
            <Head>
                <title>{post.title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:image" content="https://avatars.githubusercontent.com/u/3433324?v=4" />
            </Head>
                <div className="post-header">
                    <h1 className="post-title">{post.title}</h1>
                    <span hidden id="permalink">{`https://hiragram.app/posts/${post.id}`}</span>
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
                    <div className="hatena-bookmark-button">
                        <Script src="https://b.st-hatena.com/js/bookmark_button.js" type="text/javascript" charset="utf-8" async="async" />
                        <a href="https://b.hatena.ne.jp/entry/" className="hatena-bookmark-button" data-hatena-bookmark-layout="vertical-normal" data-hatena-bookmark-lang="ja" title="このエントリーをはてなブックマークに追加">
                            <img src="https://b.st-hatena.com/images/v4/public/entry-button/button-only@2x.png" alt="このエントリーをはてなブックマークに追加" width="20" height="20" />
                        </a>
                    </div>
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
                <div id="post-comment" />
        </Layout>
    );
}

export const getStaticPaths = async () => {
    const allPosts = await getAllPosts();
    const paths = allPosts.map((content) => `/posts/${content.id}`);
    return { paths, fallback: false };
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const data = await getPostById(id);

    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            post: data,
        },
    };
}
