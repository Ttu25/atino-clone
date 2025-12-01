import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from '../cart/CartDrawer';
import { Outlet } from 'react-router-dom';
import { BackToTopButton } from '../common/BackToTopButton';

export const Layout: React.FC = () => {
    return (
        <div className="app-layout">
            <Header />
            <CartDrawer />
            <main style={{ paddingTop: 'var(--header-height)', minHeight: '80vh' }}>
                <Outlet />
            </main>
            <BackToTopButton />
            <Footer />
        </div>
    );
};
