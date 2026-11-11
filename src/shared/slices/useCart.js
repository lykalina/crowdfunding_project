import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addInvestItem,
    incrementInvestItem,
    decrementInvestItem,
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

    const incrementInvest = useCallback(
        (id) => dispatch(incrementInvestItem(id)),
        [dispatch]
    );

    const decrementInvest = useCallback(
        (id) => dispatch(decrementInvestItem(id)),
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

    const totalCount = useMemo(
        () =>
            invest.reduce((sum, f) => sum + f.quantity, 0) + reserve.length,
        [invest, reserve]
    );

    const investTotal = useMemo(
        () =>
            invest.reduce(
                (sum, f) => sum + (f.guidePrice ?? 0) * f.quantity,
                0
            ),
        [invest]
    );

    const reserveTotal = useMemo(
        () => reserve.reduce((sum, f) => sum + (f.guidePrice ?? 0), 0),
        [reserve]
    );

    const totalPrice = investTotal + reserveTotal;

    const getInvestQuantity = useCallback(
        (id) => {
            const item = invest.find((f) => f.id === id);
            return item?.quantity ?? 0;
        },
        [invest]
    );

    const isReserved = useCallback(
        (id) => reserve.some((f) => f.id === id),
        [reserve]
    );

    return {
        invest,
        reserve,
        addInvest,
        incrementInvest,
        decrementInvest,
        addReserve,
        removeInvest,
        removeReserve,
        clear,
        totalCount,
        investTotal,
        reserveTotal,
        totalPrice,
        getInvestQuantity,
        isReserved,
    };
}