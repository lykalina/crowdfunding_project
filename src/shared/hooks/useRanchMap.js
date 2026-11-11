import { useCallback, useEffect, useRef, useState } from 'react';

export function useRanchMap(allRanches) {
    const mapRef = useRef(null);
    const [activeRanchId, setActiveRanchId] = useState(null);

    const centerOnRanch = useCallback((ranch) => {
        if (!mapRef.current || !ranch) return;

        mapRef.current.setCenter(
            [ranch.coordinates.lat, ranch.coordinates.lng],
            12,
            { duration: 500 }
        );
    }, []);

    useEffect(() => {
        if (allRanches.length === 0) return;
        if (!mapRef.current) return;

        const firstRanch = allRanches[0];
        setActiveRanchId(firstRanch.id);
        centerOnRanch(firstRanch);
    }, [allRanches, centerOnRanch]);

    const handleMapLoad = useCallback(() => {
        if (allRanches.length > 0) {
            const firstRanch = allRanches[0];
            setActiveRanchId(firstRanch.id);
            centerOnRanch(firstRanch);
        }
    }, [allRanches, centerOnRanch]);

    const selectRanchFromList = useCallback((ranch) => {
        setActiveRanchId(ranch.id);
        centerOnRanch(ranch);
    }, [centerOnRanch]);

    const centerOnCoords = useCallback((lat, lng, zoom = 9) => {
        if (!mapRef.current) return;

        mapRef.current.setCenter(
            [lat, lng],
            zoom,
            { duration: 500 }
        );
    }, []);

    return {
        mapRef,
        activeRanchId,
        handleMapLoad,
        selectRanchFromList,
        centerOnCoords,
    };
}