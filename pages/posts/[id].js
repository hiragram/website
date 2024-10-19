import { client } from '@/libs/client';
import Layout from '@/components/layout';
import { formattedDate } from '@/utils/dateFormat';
import { useRouter } from 'next/router';
import { type } from 'os';
import Head from 'next/head';
import Script from 'next/script';

export default function PostId({ post }) {
    const router = useRouter();
    const description = post.body.substring(0, 50) + "…";
    const currentUrl = "https://hiragram.app" + router.asPath;
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
            <Script src="https://platform.twitter.com/widgets.js" async></Script>
            <div>
                <div className="post-header">
                    <h1 className="post-title">{post.title}</h1>
                    <p className="datetime">{formattedDate(post.publishedAt)}</p>
                    <hr />
                </div>
                
                <div className="post-body" 
                    dangerouslySetInnerHTML={{
                    __html: `${post.body}`,
                    }}
                />

                <div className="post-share">
                    <p>
                    <a 
                        href="https://twitter.com/share?ref_src=twsrc%5Etfw" 
                        className="twitter-share-button" 
                        data-size="large" 
                        data-text={post.title}
                        data-url={currentUrl}
                        data-via="hiragram" 
                        data-related="hiragram" 
                        data-show-count="false"
                    >
                        Tweet
                    </a>
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