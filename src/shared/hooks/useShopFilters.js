import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useShopFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const ranchId = searchParams.get('ranchId');
    const filterCountry = searchParams.get('country') ?? '';
    const filterMinPrice = searchParams.get('minPrice') ?? '';
    const filterMaxPrice = searchParams.get('maxPrice') ?? '';
    const filterMinSize = searchParams.get('minSize') ?? '';
    const filterMaxSize = searchParams.get('maxSize') ?? '';

    const [draftFilters, setDraftFilters] = useState({
        country: filterCountry,
        minPrice: filterMinPrice,
        maxPrice: filterMaxPrice,
        minSize: filterMinSize,
        maxSize: filterMaxSize,
    });

    useEffect(() => {
        setDraftFilters({
            country: filterCountry,
            minPrice: filterMinPrice,
            maxPrice: filterMaxPrice,
            minSize: filterMinSize,
            maxSize: filterMaxSize,
        });
    }, [filterCountry, filterMinPrice, filterMaxPrice, filterMinSize, filterMaxSize]);

    const setDraftFilter = useCallback((key, value) => {
        setDraftFilters((prev) => ({ ...prev, [key]: value }));
    }, []);

    const applyFilters = useCallback(() => {
        const setOrDelete = (key, value) => {
            if (value === '' || value === null || value === undefined) {
                searchParams.delete(key);
            } else {
                searchParams.set(key, String(value));
            }
        };

        setOrDelete('country', draftFilters.country);
        setOrDelete('minPrice', draftFilters.minPrice);
        setOrDelete('maxPrice', draftFilters.maxPrice);
        setOrDelete('minSize', draftFilters.minSize);
        setOrDelete('maxSize', draftFilters.maxSize);

        setSearchParams(searchParams);
    }, [draftFilters, searchParams, setSearchParams]);

    const resetFilters = useCallback(() => {
        searchParams.delete('country');
        searchParams.delete('minPrice');
        searchParams.delete('maxPrice');
        searchParams.delete('minSize');
        searchParams.delete('maxSize');

        setSearchParams(searchParams);
        setDraftFilters({
            country: '',
            minPrice: '',
            maxPrice: '',
            minSize: '',
            maxSize: '',
        });
    }, [searchParams, setSearchParams]);

    const selectRanch = useCallback((id) => {
        if (id === null) {
            searchParams.delete('ranchId');
        } else {
            searchParams.set('ranchId', String(id));
        }

        setSearchParams(searchParams);
    }, [searchParams, setSearchParams]);

    const hasActiveFilters =
        filterCountry !== '' ||
        filterMinPrice !== '' ||
        filterMaxPrice !== '' ||
        filterMinSize !== '' ||
        filterMaxSize !== '';

    return {
        ranchId,
        filterCountry,
        filterMinPrice,
        filterMaxPrice,
        filterMinSize,
        filterMaxSize,
        draftFilters,
        setDraftFilter,
        applyFilters,
        resetFilters,
        selectRanch,
        hasActiveFilters,
    };
}