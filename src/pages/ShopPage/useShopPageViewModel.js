import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetRanchesQuery } from '../../services/ranchesApi';

export function useShopPageViewModel() {
    const [searchParams, setSearchParams] = useSearchParams();
    const ranchId = searchParams.get('ranchId');
    const filterCountry = searchParams.get('country') ?? '';
    const filterMinPrice = searchParams.get('minPrice') ?? '';
    const filterMaxPrice = searchParams.get('maxPrice') ?? '';
    const filterMinSize = searchParams.get('minSize') ?? '';
    const filterMaxSize = searchParams.get('maxSize') ?? '';

    const {
        data,
        isLoading,
        isError,
        error,
    } = useGetRanchesQuery();

    const allRanches = data?.ranches ?? [];

    const mapRef = useRef(null);

    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [activeFieldId, setActiveFieldId] = useState(null);
    const sortWrapperRef = useRef(null);
    const filterWrapperRef = useRef(null);

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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                sortWrapperRef.current &&
                !sortWrapperRef.current.contains(event.target)
            ) {
                setIsSortOpen(false);
            }
            if (
                filterWrapperRef.current &&
                !filterWrapperRef.current.contains(event.target)
            ) {
                setIsFilterOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleSort = useCallback(() => {
        setIsSortOpen((prev) => !prev);
        setIsFilterOpen(false);
    }, []);

    const toggleFilter = useCallback(() => {
        setIsFilterOpen((prev) => !prev);
        setIsSortOpen(false);
    }, []);

    const toggleMap = useCallback(() => {
        setIsMapOpen((prev) => !prev);
    }, []);

    const selectRanch = useCallback((id) => {
        setIsSortOpen(false);

        if (id === null) {
            searchParams.delete('ranchId');
        } else {
            searchParams.set('ranchId', String(id));
        }

        setSearchParams(searchParams);
    }, [searchParams, setSearchParams]);

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
        setIsFilterOpen(false);
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
        setIsFilterOpen(false);
    }, [searchParams, setSearchParams]);

    const hasActiveFilters =
        filterCountry !== '' ||
        filterMinPrice !== '' ||
        filterMaxPrice !== '' ||
        filterMinSize !== '' ||
        filterMaxSize !== '';

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

    const handleInstanceRef = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const selectFieldFromList = useCallback((field) => {
        if (!isMapOpen) return;

        setActiveFieldId(field.id);

        if (mapRef.current) {
            mapRef.current.setCenter(
                [field.coordinates.lat, field.coordinates.lng],
                12,
                { duration: 500 }
            );
        }
    }, [isMapOpen]);

    useEffect(() => {
        if (!isMapOpen) {
            setActiveFieldId(null);
        }
    }, [isMapOpen]);

    useEffect(() => {
        if (!fields.some((f) => f.id === activeFieldId)) {
            setActiveFieldId(null);
        }
    }, [fields, activeFieldId]);

    return {
        ranchId,
        ranch,
        allRanches,
        fields,
        countries,
        isLoading,
        isError,
        error,
        sortFilter: ranch?.name ?? 'All',
        isSortOpen,
        toggleSort,
        selectRanch,
        sortWrapperRef,
        isFilterOpen,
        toggleFilter,
        filterWrapperRef,
        draftFilters,
        setDraftFilter,
        applyFilters,
        resetFilters,
        hasActiveFilters,
        isMapOpen,
        toggleMap,
        activeFieldId,
        selectFieldFromList,
        handleInstanceRef,
    };
}