import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import matter from 'gray-matter';
import { createClient } from 'microcms-js-sdk';

const apiKey = process.env.API_KEY;
const overwrite = process.argv.includes('--overwrite');
const outputDirectory = path.join(process.cwd(), 'content/posts');

if (!apiKey) {
    console.error('API_KEY is required to export microCMS posts.');
    process.exit(1);
}

const client = createClient({
    serviceDomain: 'hiragram',
    apiKey,
});

const fetchAllPosts = async () => {
    let allPosts = [];
    let offset = 0;
    const limit = 100;

    while (true) {
        const data = await client.get({
            endpoint: 'posts',
            queries: { limit, offset },
        });

        allPosts = [...allPosts, ...data.contents];

        if (data.contents.length < limit) {
            break;
        }

        offset += limit;
    }

    return allPosts;
};

fs.mkdirSync(outputDirectory, { recursive: true });

const posts = await fetchAllPosts();

for (const post of posts) {
    const filePath = path.join(outputDirectory, post.id + '.md');

    if (fs.existsSync(filePath) && !overwrite) {
        console.log('skip ' + post.id + ': ' + filePath + ' already exists');
        continue;
    }

    const file = matter.stringify(post.body || '', {
        id: post.id,
        title: post.title,
        publishedAt: post.publishedAt,
        updatedAt: post.updatedAt,
        tags: post.tags || [],
    });

    fs.writeFileSync(filePath, file);
    console.log('wrote ' + filePath);
}

console.log('exported ' + posts.length + ' posts');
