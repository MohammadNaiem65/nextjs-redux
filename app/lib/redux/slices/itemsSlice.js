// app/lib/redux/slices/itemsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedItemId: null,
    filterText: '',
    sortOrder: 'asc',
};

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setSelectedItem: (state, action) => {
            state.selectedItemId = action.payload;
        },
        setFilterText: (state, action) => {
            state.filterText = action.payload;
        },
        toggleSortOrder: (state) => {
            state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
        },
    },
});

export const { setSelectedItem, setFilterText, toggleSortOrder } =
    itemsSlice.actions;

export default itemsSlice.reducer;
