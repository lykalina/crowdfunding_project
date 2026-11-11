import { useEffect, useRef, useState } from 'react';

export function useDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggle = () => setIsOpen((prev) => !prev);
    const close = () => setIsOpen(false);

    return {
        isOpen,
        toggle,
        close,
        wrapperRef,
    };
}