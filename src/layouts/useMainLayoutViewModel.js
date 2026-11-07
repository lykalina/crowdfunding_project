import { useEffect, useRef, useState } from 'react';
import { useCart } from '../components/CartComponent/useCart';
import { useGetCurrentUserQuery } from '../services/userApi';

export function useMainLayoutViewModel() {
    const {
        invest,
        reserve,
        removeInvest,
        removeReserve,
        totalCount,
        investTotal,
        reserveTotal,
        totalPrice,
    } = useCart();

    const { data: user } = useGetCurrentUserQuery();

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserOpen, setIsUserOpen] = useState(false);
    const cartWrapperRef = useRef(null);
    const userWrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                cartWrapperRef.current &&
                !cartWrapperRef.current.contains(event.target)
            ) {
                setIsCartOpen(false);
            }
            if (
                userWrapperRef.current &&
                !userWrapperRef.current.contains(event.target)
            ) {
                setIsUserOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleCart = () => setIsCartOpen((prev) => !prev);
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const toggleUser = () => setIsUserOpen((prev) => !prev);
    const closeMenu = () => setIsMenuOpen(false);

    return {
        invest,
        reserve,
        removeInvest,
        removeReserve,
        totalCount,
        investTotal,
        reserveTotal,
        totalPrice,
        user,
        isCartOpen,
        isMenuOpen,
        isUserOpen,
        toggleCart,
        toggleMenu,
        toggleUser,
        closeMenu,
        cartWrapperRef,
        userWrapperRef,
    };
}