import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetRanchesQuery } from '../../services/ranchesApi';

export function useShopPageViewModel() {
    const [searchParams] = useSearchParams();
    const ranchId = searchParams.get('ranchId');

    const {
        data,
        isLoading,
        isError,
        error,
    } = useGetRanchesQuery();

    const allRanches = data?.ranches ?? [];

    const fields = useMemo(() => {
        if (ranchId) {
            const ranch = allRanches.find(
                (r) => r.id === Number(ranchId)
            );
            return ranch?.fields ?? [];
        }

        return allRanches.flatMap((ranch) => ranch.fields ?? []);
    }, [allRanches, ranchId]);

    const ranch = useMemo(() => {
        if (!ranchId) return null;
        return allRanches.find((r) => r.id === Number(ranchId)) ?? null;
    }, [allRanches, ranchId]);

    return {
        ranchId,
        ranch,
        allRanches,
        fields,
        isLoading,
        isError,
        error,
    };
}