import { useEffect, useState } from 'react';
import './BackToTopButton.css';

export const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 200);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            aria-label="Về đầu trang"
            className={`back-to-top ${isVisible ? 'visible' : ''}`}
            onClick={scrollToTop}
        >
            <span>Về đầu trang</span>
        </button>
    );
};

