import Link from 'next/link';
import { client } from '@/libs/client';
import Layout from '@/components/layout';
import { formattedDate } from '@/utils/dateFormat';

export default function Home({ posts }) {
  return (
    <Layout>
        <div className="posts-container">
            <h1>Posts</h1>
            {posts.map((post) => (
                
                <Link href={`/posts/${post.id}`}>
                    <div className="post-container" key={post.id}>
                        <p className="datetime">{formattedDate(post.publishedAt)}</p>
                        <p className="post-title">{post.title}</p>
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