import React, { useState, useEffect } from 'react';
import { blogAPI } from '../../services/api';
import { Calendar, User, Loader } from 'lucide-react';
import './Blog.css';

interface BlogPost {
    _id?: string;
    id?: string;
    title: string;
    excerpt: string;
    image: string;
    category: string;
    date?: string;
    author: string;
    authorName?: string;
    createdAt?: string;
}

export const Blog: React.FC = () => {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [categories, setCategories] = useState<string[]>(['All']);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                setLoading(true);
                const [postsResponse, categoriesResponse] = await Promise.all([
                    blogAPI.getPosts(),
                    blogAPI.getCategories()
                ]);

                if (postsResponse.success) {
                    setBlogPosts(postsResponse.data);
                }

                if (categoriesResponse.success) {
                    setCategories(['All', ...categoriesResponse.data]);
                }
            } catch (error) {
                console.error('Error fetching blog data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogData();
    }, []);

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
                {loading ? (
                    <div className="loading-container">
                        <Loader className="loading-spinner" size={40} />
                        <p>Đang tải bài viết...</p>
                    </div>
                ) : filteredPosts.length > 0 ? (
                    filteredPosts.map(post => (
                        <article key={post.id || post._id} className="blog-card">
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
                                        {post.date || new Date(post.createdAt || '').toLocaleDateString('vi-VN')}
                                    </span>
                                    <span className="meta-item">
                                        <User size={16} />
                                        {post.authorName || post.author}
                                    </span>
                                </div>
                                <button className="btn btn-outline read-more-btn">ĐỌC THÊM</button>
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="no-posts">Không tìm thấy bài viết nào.</div>
                )}
            </div>
        </div>
    );
};
