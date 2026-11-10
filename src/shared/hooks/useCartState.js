import { useCart } from '../slices/useCart';

export function useCartState() {
    const {
        invest,
        reserve,
        removeInvest,
        removeReserve,
        totalCount,
        investTotal,
        reserveTotal,
        totalPrice,
    } = useCart();

    return {
        invest,
        reserve,
        removeInvest,
        removeReserve,
        totalCount,
        investTotal,
        reserveTotal,
        totalPrice,
    };
}