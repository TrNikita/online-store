import {createSlice} from '@reduxjs/toolkit';
import api from '../api';

const initialState = {
    entities: null,
    isLoading: true,
    error: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productsRequested: (state) => {
            state.isLoading = true;
        },
        productsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        productsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

const {reducer: productsReducer, actions} = productsSlice;

const {productsReceived, productsRequested, productsRequestFailed} = actions;

export const loadProductsList = () => async (dispatch) => {
    dispatch(productsRequested());
    try {
        const content = await api.products.fetchAll();
        dispatch(productsReceived(content));
    } catch (e) {
        dispatch(productsRequestFailed(e.message));
    }
};

export const getProducts = () => (state) => state.products.entities;

export const getProductById = (productId) => (state) => {
    if (state.products.entities)
        return state.products.entities.find((p) => p._id === productId);
};

export default productsReducer;
