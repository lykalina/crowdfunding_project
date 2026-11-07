import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    invest: [],
    reserve: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addInvestItem(state, action) {
            const field = action.payload;
            const exists = state.invest.some((f) => f.id === field.id);
            if (!exists) {
                state.invest.push(field);
            }
        },
        addReserveItem(state, action) {
            const field = action.payload;
            const exists = state.reserve.some((f) => f.id === field.id);
            if (!exists) {
                state.reserve.push(field);
            }
        },
        removeInvestItem(state, action) {
            state.invest = state.invest.filter((f) => f.id !== action.payload);
        },
        removeReserveItem(state, action) {
            state.reserve = state.reserve.filter((f) => f.id !== action.payload);
        },
        clearCart(state) {
            state.invest = [];
            state.reserve = [];
        },
    },
});

export const {
    addInvestItem,
    addReserveItem,
    removeInvestItem,
    removeReserveItem,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;