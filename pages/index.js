import Link from 'next/link';
import { useState } from 'react';
import { client } from '@/libs/client';
import Layout from '@/components/layout';
import { formattedDate } from '@/utils/dateFormat';

export default function Home({ posts }) {
    const [selectedTag, setSelectedTag] = useState(null);
    
    // Sort posts by publishedAt date in descending order
    const sortedPosts = posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    
    // Get all unique tags
    const allTags = [...new Set(posts.flatMap(post => post.tags))];
    
    // Filter posts by selected tag
    const filteredPosts = selectedTag 
        ? sortedPosts.filter(post => post.tags.includes(selectedTag))
        : sortedPosts;

    return (
        <Layout>
            <div className="posts-container">
                <h1>Posts <a href="/feed"><span className="material-symbols-outlined accessory-icon">rss_feed</span></a></h1>
                
                {/* Tag filter section */}
                <div className="tag-filter-container">
                    <button 
                        className={`tag-filter ${!selectedTag ? 'active' : ''}`}
                        onClick={() => setSelectedTag(null)}
                    >
                        すべて
                    </button>
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            className={`tag-filter ${selectedTag === tag ? 'active' : ''}`}
                            onClick={() => setSelectedTag(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
                {filteredPosts.map((post) => (
                    <div className="post-container" key={post.id}>
                        <p className="datetime">{formattedDate(post.publishedAt)}</p>
                        <div className="post-metadata-container">
                            <Link key={`${post.id}`} href={`/posts/${post.id}`}>
                                <p className="post-title">{post.title}</p>
                            </Link>
                            <p className="post-tag-container">
                                {post.tags.map((tag) => (
                                    <span 
                                        className={`tag-${tag} label clickable-tag`} 
                                        key={tag}
                                        onClick={() => setSelectedTag(tag)}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>
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
