import {createAction, createSlice} from '@reduxjs/toolkit';
import productService from '../services/product.service';

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
        productCreatedSuccess: (state, action) => {
            if (!Array.isArray(state.entities)) state.entities = [];
            state.entities.push(action.payload);
        },
        productCreatedFailed: (state, action) => {
            state.error = action.payload;
        },
        productRemovedFailed: (state, action) => {
            state.error = action.payload;
        },
        productRemovedSuccess: (state, action) => {
            const index = state.entities.findIndex(
                (p) => p._id === action.payload,
            );
            state.entities.splice(index, 1);
        },
        productUpdateSuccessed: (state, action) => {
            state.entities[
                state.entities.findIndex((p) => p._id === action.payload._id)
            ] = action.payload;
        },
    },
});

const {reducer: productsReducer, actions} = productsSlice;

const {
    productsRequested,
    productsReceived,
    productsRequestFailed,
    productCreatedSuccess,
    productCreatedFailed,
    productRemovedFailed,
    productRemovedSuccess,
    productUpdateSuccessed,
} = actions;

const productCreateRequested = createAction('products/productCreateRequested');
const productRemoveRequested = createAction('products/productRemoveRequested');
const productUpdateRequested = createAction('products/productUpdateRequested');
const productUpdateFailed = createAction('products/productUpdateFailed');

export const loadProductsList = () => async (dispatch) => {
    dispatch(productsRequested());
    try {
        const {content} = await productService.get();
        dispatch(productsReceived(content));
    } catch (e) {
        dispatch(productsRequestFailed(e.message));
    }
};

export const createProduct = (payload) => async (dispatch) => {
    dispatch(productCreateRequested());
    try {
        const {content} = await productService.create({...payload});
        console.log('content', content);
        dispatch(productCreatedSuccess(content));
    } catch (error) {
        console.log('error', error);
        error.response.data.message
            ? dispatch(productCreatedFailed(error.response.data.message))
            : dispatch(productCreatedFailed(error.response.data.error.message));
    }
};

export const updateProduct = (payload) => async (dispatch) => {
    dispatch(productUpdateRequested());
    try {
        const {content} = await productService.update(payload);
        dispatch(productUpdateSuccessed(content));
    } catch (error) {
        console.log('error', error);
        error.response.data.message
            ? dispatch(productUpdateFailed(error.response.data.message))
            : dispatch(productUpdateFailed(error.response.data.error.message));
    }
};

export const removeProduct = (payload) => async (dispatch) => {
    dispatch(productRemoveRequested());
    try {
        await productService.remove(payload);
        dispatch(productRemovedSuccess(payload));
    } catch (e) {
        dispatch(productRemovedFailed(e.message));
    }
};

export const getProducts = () => (state) => state.products.entities;
export const getProductErrors = () => (state) => state.products.error;

export const getProductById = (productId) => (state) => {
    if (state.products.entities)
        return state.products.entities.find((p) => p._id === productId);
};

export default productsReducer;
