import Link from 'next/link';
import { client } from '@/libs/client';
import Layout from '@/components/layout';
import { formattedDate } from '@/utils/dateFormat';

export default function Home({ posts }) {
    // Sort posts by publishedAt date in descending order
    const sortedPosts = posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    return (
        <Layout>
            <div className="posts-container">
                <h1>Posts <a href="/feed"><span className="material-symbols-outlined accessory-icon">rss_feed</span></a></h1>
                {sortedPosts.map((post) => (
                    <Link key={`${post.id}`} href={`/posts/${post.id}`}>
                        <div className="post-container" key={post.id}>
                            <p className="datetime">{formattedDate(post.publishedAt)}</p>
                            <div className="post-metadata-container">    
                                <p className="post-title">{post.title}</p>
                                <p className="post-tag-container">
                                    {post.tags.map((tag) => (
                                        <span className={`tag-${tag} label`} key={tag}>{tag}</span>
                                    ))}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}

                <p className="link-to-older-blog"><a target="_blank" href="https://hiragram.hatenablog.jp/archive">それ以前のブログ</a></p>
            </div>
        </Layout>
    );
}

export const getStaticProps = async () => {
    const data = await client.get({ endpoint: "posts" });

    return {
        props: {
            posts: data.contents,
        },
    };
};