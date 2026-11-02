import { useCallback } from 'react';

export function useMainLayoutViewModel() {
    const scrollToLocations = useCallback(() => {
        const element = document.getElementById('locations');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);

    return {
        scrollToLocations,
    };
}