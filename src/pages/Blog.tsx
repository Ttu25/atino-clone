import React, { useState } from 'react';
import { blogPosts } from '../data/blog';
import { Calendar, User } from 'lucide-react';
import './Blog.css';

export const Blog: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];

    const filteredPosts = selectedCategory === 'All'
        ? blogPosts
        : blogPosts.filter(post => post.category === selectedCategory);

    return (
        <div className="blog-page container">
            <h1 className="page-title">BLOG & TIN TỨC</h1>

            <div className="blog-categories">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="blog-grid">
                {filteredPosts.map(post => (
                    <article key={post.id} className="blog-card">
                        <div className="blog-image">
                            <img src={post.image} alt={post.title} />
                            <span className="blog-category-badge">{post.category}</span>
                        </div>
                        <div className="blog-content">
                            <h2 className="blog-title">{post.title}</h2>
                            <p className="blog-excerpt">{post.excerpt}</p>
                            <div className="blog-meta">
                                <span className="meta-item">
                                    <Calendar size={16} />
                                    {post.date}
                                </span>
                                <span className="meta-item">
                                    <User size={16} />
                                    {post.author}
                                </span>
                            </div>
                            <button className="btn btn-outline read-more-btn">ĐỌC THÊM</button>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};
