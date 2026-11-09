import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addInvestItem,
    addReserveItem,
    removeInvestItem,
    removeReserveItem,
    clearCart,
} from './cartSlice';

export function useCart() {
    const dispatch = useDispatch();

    const invest = useSelector((state) => state.cart.invest);
    const reserve = useSelector((state) => state.cart.reserve);

    const addInvest = useCallback(
        (field) => dispatch(addInvestItem(field)),
        [dispatch]
    );

    const addReserve = useCallback(
        (field) => dispatch(addReserveItem(field)),
        [dispatch]
    );

    const removeInvest = useCallback(
        (id) => dispatch(removeInvestItem(id)),
        [dispatch]
    );

    const removeReserve = useCallback(
        (id) => dispatch(removeReserveItem(id)),
        [dispatch]
    );

    const clear = useCallback(() => dispatch(clearCart()), [dispatch]);

    const totalCount = invest.length + reserve.length;

    const investTotal = useMemo(
        () => invest.reduce((sum, f) => sum + (f.guidePrice ?? 0), 0),
        [invest]
    );

    const reserveTotal = useMemo(
        () => reserve.reduce((sum, f) => sum + (f.guidePrice ?? 0), 0),
        [reserve]
    );

    const totalPrice = investTotal + reserveTotal;

    return {
        invest,
        reserve,
        addInvest,
        addReserve,
        removeInvest,
        removeReserve,
        clear,
        totalCount,
        investTotal,
        reserveTotal,
        totalPrice,
    };
}