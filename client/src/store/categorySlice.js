import {createSlice} from '@reduxjs/toolkit';
import api from '../api';

const initialState = {
    entities: null,
    isLoading: true,
    error: null,
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        categoryRequested: (state) => {
            state.isLoading = true;
        },
        categoryReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        categoryRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

const {reducer: categoryReducer, actions} = categorySlice;

const {categoryReceived, categoryRequested, categoryRequestFailed} = actions;

export const loadCategoryList = () => async (dispatch) => {
    dispatch(categoryRequested());
    try {
        const content = await api.category.fetchAll();
        dispatch(categoryReceived(content));
    } catch (e) {
        dispatch(categoryRequestFailed(e.message));
    }
};

export const getCategory = () => (state) => state.category.entities;

export default categoryReducer;
