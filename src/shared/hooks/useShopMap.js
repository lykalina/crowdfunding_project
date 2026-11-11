import { useCallback, useEffect, useRef, useState } from 'react';

export function useShopMap({ fields }) {
    const mapRef = useRef(null);
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [activeFieldId, setActiveFieldId] = useState(null);

    const toggleMap = useCallback(() => {
        setIsMapOpen((prev) => !prev);
    }, []);

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
        mapRef,
        isMapOpen,
        toggleMap,
        activeFieldId,
        selectFieldFromList,
        handleInstanceRef,
    };
}