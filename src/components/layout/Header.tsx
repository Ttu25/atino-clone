import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

export const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { cartCount, setIsCartOpen } = useCart();
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setIsSearchOpen(false);
            navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
        }
    };

    const handleUserClick = () => {
        if (isAuthenticated) {
            navigate('/account');
        } else {
            navigate('/login');
        }
    };

    return (
        <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
            <div className="container header-container">
                <div className="header-left">
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu size={24} />
                    </button>
                    <Link to="/" className="logo">
                        ATINO
                    </Link>
                </div>

                <nav className="header-nav desktop-nav">
                    <Link to="/new-arrivals">NEW ARRIVALS</Link>
                    <Link to="/products">SẢN PHẨM</Link>
                    <Link to="/collections">BỘ SƯU TẬP</Link>
                    <Link to="/sale">SALE</Link>
                    <Link to="/about">VỀ CHÚNG TÔI</Link>
                </nav>

                <div className="header-actions">
                    <div className="search-wrapper">
                        <button className="icon-btn" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                            <Search size={22} />
                        </button>
                        {isSearchOpen && (
                            <form className="search-dropdown" onSubmit={handleSearch}>
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                />
                            </form>
                        )}
                    </div>
                    <button className="icon-btn user-btn" onClick={handleUserClick} title={isAuthenticated ? user?.name : 'Đăng nhập'}>
                        <User size={22} />
                        {isAuthenticated && <span className="user-indicator"></span>}
                    </button>
                    <button className="icon-btn cart-btn" onClick={() => setIsCartOpen(true)}>
                        <ShoppingBag size={22} />
                        <span className="cart-count">{cartCount}</span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(false)} />
            <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-header">
                    <span className="logo">ATINO</span>
                    <button onClick={() => setIsMobileMenuOpen(false)}>
                        <X size={24} />
                    </button>
                </div>
                <nav className="mobile-nav-links">
                    <Link to="/new-arrivals" onClick={() => setIsMobileMenuOpen(false)}>NEW ARRIVALS</Link>
                    <Link to="/products" onClick={() => setIsMobileMenuOpen(false)}>SẢN PHẨM</Link>
                    <Link to="/collections" onClick={() => setIsMobileMenuOpen(false)}>BỘ SƯU TẬP</Link>
                    <Link to="/sale" onClick={() => setIsMobileMenuOpen(false)}>SALE</Link>
                    <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>VỀ CHÚNG TÔI</Link>
                </nav>
            </div>
        </header>
    );
};
