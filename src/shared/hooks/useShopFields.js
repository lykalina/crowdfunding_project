import { useMemo } from 'react';

export function useShopFields({
                                  allRanches,
                                  ranchId,
                                  filterCountry,
                                  filterMinPrice,
                                  filterMaxPrice,
                                  filterMinSize,
                                  filterMaxSize,
                              }) {
    const countries = useMemo(() => {
        const set = new Set();
        allRanches.forEach((r) => {
            if (r.country) set.add(r.country);
        });
        return Array.from(set).sort();
    }, [allRanches]);

    const fields = useMemo(() => {
        let base;

        if (ranchId) {
            const ranch = allRanches.find(
                (r) => r.id === Number(ranchId)
            );
            base = ranch?.fields ?? [];
        } else {
            base = allRanches.flatMap((ranch) => ranch.fields ?? []);
        }

        if (filterCountry) {
            base = base.filter((f) => f.country === filterCountry);
        }

        const minPrice = filterMinPrice === '' ? null : Number(filterMinPrice);
        const maxPrice = filterMaxPrice === '' ? null : Number(filterMaxPrice);
        const minSize = filterMinSize === '' ? null : Number(filterMinSize);
        const maxSize = filterMaxSize === '' ? null : Number(filterMaxSize);

        if (minPrice !== null && !Number.isNaN(minPrice)) {
            base = base.filter((f) => f.guidePrice >= minPrice);
        }
        if (maxPrice !== null && !Number.isNaN(maxPrice)) {
            base = base.filter((f) => f.guidePrice <= maxPrice);
        }
        if (minSize !== null && !Number.isNaN(minSize)) {
            base = base.filter((f) => f.sizeSqm >= minSize);
        }
        if (maxSize !== null && !Number.isNaN(maxSize)) {
            base = base.filter((f) => f.sizeSqm <= maxSize);
        }

        return base;
    }, [
        allRanches,
        ranchId,
        filterCountry,
        filterMinPrice,
        filterMaxPrice,
        filterMinSize,
        filterMaxSize,
    ]);

    const ranch = useMemo(() => {
        if (!ranchId) return null;
        return allRanches.find((r) => r.id === Number(ranchId)) ?? null;
    }, [allRanches, ranchId]);

    return {
        fields,
        countries,
        ranch,
    };
}