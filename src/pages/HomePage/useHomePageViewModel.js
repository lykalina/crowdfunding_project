
import { useCallback, useEffect, useRef, useState } from 'react';
import { useGetRanchesQuery } from '../../services/ranchesApi';

export function useHomePageViewModel() {
    const {
        data,
        isLoading,
        isError,
        error
    } = useGetRanchesQuery();

    const mapRef = useRef(null);
    const ymapsRef = useRef(null);
    const searchWrapperRef = useRef(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        /*
        if (data) {
            console.log('Products:', data);
        }
         */
    }, [data]);

    useEffect(() => {
        if (isError) {
            console.error('Products error:', error);
        }
    }, [isError, error]);

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

    const handleSearch = async () => {
        const query = searchQuery.trim();

        if (!query) return;

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

        } catch (error) {
            console.error('Geocoder error:', error);
            setSearchError('Search failed. Please try again.');
        } finally {
            setIsSearching(false);
        }
    };

    const selectLocation = (location) => {
        setSelectedLocation(location);

        setSearchQuery(
            `${location.name}, ${location.description}`
        );

        setIsDropdownOpen(false);

        if (mapRef.current) {
            mapRef.current.setCenter(
                [location.latitude, location.longitude],
                9,
                { duration: 500 }
            );
        }
    };

    const scrollToLocations = useCallback(() => {
        const element = document.getElementById('locations');

        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, []);

    return {
        scrollToLocations,
        ranches: data?.ranches ?? [],
        mapRef,
        ymapsRef,
        searchWrapperRef,
        isLoading,
        isError,
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
    };
}
