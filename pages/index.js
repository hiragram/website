import Link from 'next/link';
import { client } from '@/libs/client';
import Layout from '@/components/layout';
import { formattedDate } from '@/utils/dateFormat';

export default function Home({ posts }) {
  return (
    <Layout>
        <div>
            <h1>Posts</h1>
            <ul className="no-dot">
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link href={`/posts/${post.id}`}>
                            <span className="datetime">{formattedDate(post.publishedAt)}</span>
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>

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