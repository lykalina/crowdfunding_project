import { useCallback, useEffect, useRef, useState } from 'react';

export function useLocationSearch({ onLocationSelect }) {
    const searchWrapperRef = useRef(null);
    const debounceTimerRef = useRef(null);
    const skipNextSearchRef = useRef(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchWrapperRef.current &&
                !searchWrapperRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const runSearch = useCallback(async (query) => {
        setIsSearching(true);
        setSearchError(null);
        setSearchResults([]);
        setIsDropdownOpen(false);

        const params = new URLSearchParams({
            apikey: process.env.YANDEX_GEOCODER_API_KEY,
            geocode: query,
            lang: 'en_US',
            format: 'json',
            results: '10',
        });

        try {
            const response = await fetch(
                `https://geocode-maps.yandex.ru/v1/?${params}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const responseData = await response.json();

            const features =
                responseData.response.GeoObjectCollection.featureMember;

            const results = features.map(({ GeoObject }) => {
                const [longitude, latitude] = GeoObject.Point.pos
                    .split(' ')
                    .map(Number);

                return {
                    id: GeoObject.uri,
                    name: GeoObject.name,
                    description: GeoObject.description,
                    latitude,
                    longitude,
                };
            });

            setSearchResults(results);
            setIsDropdownOpen(results.length > 0);

            if (results.length === 0) {
                setSearchError('Nothing found');
            }
        } catch (err) {
            console.error('Geocoder error:', err);
            setSearchError('Search failed. Please try again.');
        } finally {
            setIsSearching(false);
        }
    }, []);

    useEffect(() => {
        if (skipNextSearchRef.current) {
            skipNextSearchRef.current = false;
            return;
        }

        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        const query = searchQuery.trim();

        if (!query) {
            setSearchResults([]);
            setSearchError(null);
            setIsDropdownOpen(false);
            return;
        }

        debounceTimerRef.current = setTimeout(() => {
            runSearch(query);
        }, 500);

        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, [searchQuery, runSearch]);

    const handleSearch = () => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        const query = searchQuery.trim();

        if (!query) return;

        runSearch(query);
    };

    const selectLocation = (location) => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        skipNextSearchRef.current = true;

        setSelectedLocation(location);
        setSearchQuery(`${location.name}, ${location.description}`);
        setSearchResults([]);
        setSearchError(null);
        setIsDropdownOpen(false);

        if (onLocationSelect) {
            onLocationSelect(location);
        }
    };

    const clearSearch = useCallback(() => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        skipNextSearchRef.current = true;

        setSearchQuery('');
        setSearchResults([]);
        setSearchError(null);
        setIsDropdownOpen(false);
        setSelectedLocation(null);
    }, []);

    return {
        searchWrapperRef,
        searchQuery,
        setSearchQuery,
        searchResults,
        selectedLocation,
        isSearching,
        searchError,
        isDropdownOpen,
        setIsDropdownOpen,
        handleSearch,
        selectLocation,
        clearSearch,
    };
}