import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import { client } from '@/libs/client';

const postsDirectory = path.join(process.cwd(), 'content/posts');

const markdown = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
});

const normalizeTags = (tags) => {
    if (Array.isArray(tags)) {
        return tags;
    }

    if (typeof tags === 'string') {
        return tags.split(',').map((tag) => tag.trim()).filter(Boolean);
    }

    return [];
};

const normalizeDate = (value) => {
    if (value instanceof Date) {
        return value.toISOString();
    }

    if (typeof value === 'string') {
        return value;
    }

    return null;
};

const getFileSlug = (file) => file.replace(/\.md$/, '');

const getHashedId = (file) => crypto
    .createHash('sha256')
    .update(getFileSlug(file))
    .digest('hex')
    .slice(0, 12);

const getMarkdownPostFiles = () => {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.md'));
};

export const getMarkdownPosts = async () => {
    return getMarkdownPostFiles().map((file) => {
        const fullPath = path.join(postsDirectory, file);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const id = data.id || getHashedId(file);

        if (!data.title) {
            throw new Error(`Missing title in ${fullPath}`);
        }

        const publishedAt = normalizeDate(data.publishedAt);
        if (!publishedAt) {
            throw new Error(`Missing publishedAt in ${fullPath}`);
        }

        return {
            id,
            title: data.title,
            tags: normalizeTags(data.tags),
            body: markdown.render(content),
            publishedAt,
            updatedAt: normalizeDate(data.updatedAt) || publishedAt,
            source: 'markdown',
        };
    });
};

export const getMicroCmsPosts = async () => {
    if (!process.env.API_KEY) {
        return [];
    }

    let allPosts = [];
    let offset = 0;
    const limit = 100;

    while (true) {
        const data = await client.get({
            endpoint: 'posts',
            queries: { limit, offset },
        });

        allPosts = [...allPosts, ...data.contents.map((post) => ({
            ...post,
            tags: normalizeTags(post.tags),
            source: 'microcms',
        }))];

        if (data.contents.length < limit) {
            break;
        }

        offset += limit;
    }

    return allPosts;
};

export const getAllPosts = async () => {
    const [microCmsPosts, markdownPosts] = await Promise.all([
        getMicroCmsPosts(),
        getMarkdownPosts(),
    ]);

    const postsById = new Map();

    microCmsPosts.forEach((post) => {
        postsById.set(post.id, post);
    });

    // Markdown wins on duplicate IDs, so migrated articles keep /posts/{id}.
    markdownPosts.forEach((post) => {
        postsById.set(post.id, post);
    });

    return Array.from(postsById.values());
};

export const getPostById = async (id) => {
    const posts = await getAllPosts();
    return posts.find((post) => post.id === id) || null;
};
