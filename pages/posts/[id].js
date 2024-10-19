import { client } from '../../libs/client';
import Layout from '/components/Layout';
import { formattedDate } from '/utils/dateFormat';

export default function PostId({ post }) {
  return (
    <Layout>
    <div>
        <div className="post-header">
            <h1 className="post-title">{post.title}</h1>
            <p>{formattedDate(post.publishedAt)}</p>
        </div>
        <div className="post-body" 
            dangerouslySetInnerHTML={{
            __html: `${post.body}`,
            }}
        />
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