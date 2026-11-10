import { useEffect } from 'react';
import { useGetRanchesQuery } from '../../services/ranchesApi';

export function useRanches() {
    const {
        data,
        isLoading,
        isError,
        error,
    } = useGetRanchesQuery();

    const allRanches = data?.ranches ?? [];

    useEffect(() => {
        if (isError) {
            console.error('Ranches error:', error);
        }
    }, [isError, error]);

    return {
        allRanches,
        isLoading,
        isError,
    };
}