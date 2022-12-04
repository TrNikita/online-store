import {createSlice} from '@reduxjs/toolkit';
import api from '../api';

const initialState = {
    entities: null,
    isLoading: true,
    error: null,
};

const brandsSlice = createSlice({
    name: 'brands',
    initialState,
    reducers: {
        brandsRequested: (state) => {
            state.isLoading = true;
        },
        brandsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        brandsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

const {reducer: brandsReducer, actions} = brandsSlice;

const {brandsReceived, brandsRequested, brandsRequestFailed} = actions;

export const loadBrandsList = () => async (dispatch) => {
    dispatch(brandsRequested());
    try {
        const content = await api.brands.fetchAll();
        dispatch(brandsReceived(content));
    } catch (e) {
        dispatch(brandsRequestFailed(e.message));
    }
};

export const getBrands = () => (state) => state.brands.entities;

export default brandsReducer;
