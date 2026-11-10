import { useCallback, useEffect, useState } from 'react';

const PAGE_SIZE = 6;

export function useShopPagination({ fields, resetKey }) {
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    const visibleFields = fields.slice(0, visibleCount);
    const hasMore = visibleCount < fields.length;

    const showMore = useCallback(() => {
        setVisibleCount((prev) => prev + PAGE_SIZE);
    }, []);

    useEffect(() => {
        setVisibleCount(PAGE_SIZE);
    }, [resetKey]);

    return {
        visibleFields,
        hasMore,
        showMore,
    };
}