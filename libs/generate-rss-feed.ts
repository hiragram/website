import RSS from 'rss';
import { createClient } from 'microcms-js-sdk';

export const client = createClient({
    serviceDomain: 'hiragram',
    apiKey: process.env.API_KEY!,
});

const generateFeed = async (): Promise<string> => {
    const feed = new RSS({
        title: 'hiragram.app',
        site_url: 'https://hiragram.app',
        feed_url: '/feed',
        language: 'ja',
    });

    const data = await client.get({
        endpoint: "posts",
          queries: {
            limit: 100,
          },
      });
    data.contents.forEach((post: any) => {
        feed.item({
            title: post.title,
            description: post.body,
            date: new Date(post.createdAt),
            url: `https://hiragram.app/posts/${post.id}`,
        })
    });
    
    // XML形式の文字列にする
    return feed.xml();
};

export default generateFeed;