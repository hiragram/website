import Link from 'next/link';
import { useState } from 'react';
import { client } from '@/libs/client';
import Layout from '@/components/layout';
import { formattedDate } from '@/utils/dateFormat';

export default function Home({ posts }) {
    const [selectedTags, setSelectedTags] = useState([]);
    
    // Sort posts by publishedAt date in descending order
    const sortedPosts = posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    
    // Get all unique tags
    const allTags = [...new Set(posts.flatMap(post => post.tags))];
    
    // Filter posts by selected tags
    const filteredPosts = selectedTags.length > 0
        ? sortedPosts.filter(post => 
            selectedTags.every(tag => post.tags.includes(tag))
          )
        : sortedPosts;

    const handleTagClick = (tag) => {
        setSelectedTags(prev => 
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const clearTags = () => {
        setSelectedTags([]);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <Layout>
            <div className="posts-container">
                <h1>Posts <a href="/feed"><span className="material-symbols-outlined accessory-icon">rss_feed</span></a></h1>
                
                {/* Tag filter section */}
                <div className="tag-filter-container">
                    {selectedTags.length > 0 && (
                        <div className={`selected-tags-container ${selectedTags.length > 0 ? 'visible' : ''}`}>
                            <div className="selected-tags">
                                {selectedTags.map(tag => (
                                    <button
                                        key={tag}
                                        className="tag-filter active"
                                        onClick={() => handleTagClick(tag)}
                                    >
                                        {tag} ×
                                    </button>
                                ))}
                            </div>
                            <button 
                                className="clear-tags-button"
                                onClick={clearTags}
                            >
                                Clear filter
                            </button>
                        </div>
                    )}
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
                                        onClick={() => {
                                            if (!selectedTags.includes(tag)) {
                                                handleTagClick(tag);
                                            }
                                        }}
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
