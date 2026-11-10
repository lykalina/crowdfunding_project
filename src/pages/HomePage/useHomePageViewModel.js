import { useCallback, useEffect, useRef, useState } from 'react';
import { useGetRanchesQuery } from '../../services/ranchesApi';
import img1 from '../../assets/images/1.webp';
import img2 from '../../assets/images/2.webp';
import img3 from '../../assets/images/3.webp';

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

    const [visibleRanches, setVisibleRanches] = useState([]);

    const allRanches = data?.ranches ?? [];

    const imageBoxesData = [
        {
            id: 1,
            img: img1,
            alt: 'img1',
            info: 'Rent your own piece of farmland and watch your vegetables grow.'
        },
        {
            id: 2,
            img: img2,
            alt: 'img2',
            info: 'Enjoy, year after year, the wonders of nature with your rented vegetable farmland (60 sqm / 30 sqm).'
        },
        {
            id: 3,
            img: img3,
            alt: 'img3',
            info: 'Grow your own piece of land, from planting seeds in the lush soil to harvesting your own vegetables.'
        }
    ]

    const filterRanchesByBounds = useCallback(() => {
        const map = mapRef.current;
        const ymaps = ymapsRef.current;

        if (!map || !ymaps || allRanches.length === 0) {
            setVisibleRanches(allRanches);
            return;
        }

        try {
            const bounds = map.getBounds();
            if (!bounds) {
                setVisibleRanches(allRanches);
                return;
            }

            const filtered = allRanches.filter((ranch) => {
                const point = [ranch.coordinates.lat, ranch.coordinates.lng];
                return ymaps.util.bounds.containsPoint(bounds, point);
            });

            setVisibleRanches(filtered);
        } catch (err) {
            console.error('Bounds filtering error:', err);
            setVisibleRanches(allRanches);
        }
    }, [allRanches]);

    useEffect(() => {
        if (allRanches.length > 0 && mapRef.current) {
            filterRanchesByBounds();
        }
    }, [allRanches, filterRanchesByBounds]);

    const handleBoundsChange = useCallback(() => {
        filterRanchesByBounds();
    }, [filterRanchesByBounds]);

    const handleMapLoad = useCallback((ymaps) => {
        ymapsRef.current = ymaps;
        filterRanchesByBounds();
    }, [filterRanchesByBounds]);

    useEffect(() => {
        if (isError) {
            console.error('Ranches error:', error);
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
        ranches: visibleRanches,
        allRanches,
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
        handleBoundsChange,
        handleMapLoad,
        imageBoxesData
    };
}