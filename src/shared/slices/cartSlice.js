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
            const existing = state.invest.find((f) => f.id === field.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.invest.push({ ...field, quantity: 1 });
            }
        },
        incrementInvestItem(state, action) {
            const item = state.invest.find((f) => f.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decrementInvestItem(state, action) {
            const item = state.invest.find((f) => f.id === action.payload);
            if (!item) return;
            item.quantity -= 1;
            if (item.quantity <= 0) {
                state.invest = state.invest.filter((f) => f.id !== action.payload);
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
    incrementInvestItem,
    decrementInvestItem,
    addReserveItem,
    removeInvestItem,
    removeReserveItem,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;