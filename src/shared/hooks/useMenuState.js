import { useState } from 'react';

export function useMenuState() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const closeMenu = () => setIsMenuOpen(false);

    return {
        isMenuOpen,
        toggleMenu,
        closeMenu,
    };
}