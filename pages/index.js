import Link from 'next/link';
import { client } from '@/libs/client';
import Layout from '@/components/Layout';
import { formattedDate } from '@/utils/dateFormat';

export default function Home({ posts }) {
  return (
    <Layout>
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link href={`/posts/${post.id}`}>
                            <span>{formattedDate(post.publishedAt)}</span>
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
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