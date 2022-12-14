import {createAction, createSlice} from '@reduxjs/toolkit';
import categoryService from '../services/category.service';

const initialState = {
    entities: null,
    isLoading: true,
    error: null,
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        categoriesRequested: (state) => {
            state.isLoading = true;
        },
        categoriesReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        categoriesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        categoryCreatedSuccess: (state, action) => {
            if (!Array.isArray(state.entities)) state.entities = [];
            state.entities.push(action.payload);
        },
        categoryCreatedFailed: (state, action) => {
            state.error = action.payload;
        },
        categoryRemovedFailed: (state, action) => {
            state.error = action.payload;
        },
        categoryRemovedSuccess: (state, action) => {
            const index = state.entities.findIndex(
                (c) => c._id === action.payload,
            );
            state.entities.splice(index, 1);
        },
    },
});

const {reducer: categoriesReducer, actions} = categoriesSlice;

const {
    categoriesRequested,
    categoriesReceived,
    categoriesRequestFailed,
    categoryCreatedSuccess,
    categoryCreatedFailed,
    categoryRemovedSuccess,
    categoryRemovedFailed,
} = actions;

const categoryCreateRequested = createAction(
    'categories/categoryCreateRequested',
);
const categoryRemoveRequested = createAction(
    'categories/categoryRemoveRequested',
);

export const loadCategoriesList = () => async (dispatch) => {
    dispatch(categoriesRequested());
    try {
        const {content} = await categoryService.get();
        dispatch(categoriesReceived(content));
    } catch (e) {
        dispatch(categoriesRequestFailed(e.message));
    }
};

export const createCategory = (payload) => async (dispatch) => {
    dispatch(categoryCreateRequested());
    try {
        const {content} = await categoryService.create({...payload});
        console.log('content', content);
        dispatch(categoryCreatedSuccess(content));
    } catch (error) {
        console.log('error', error);
        error.response.data.message
            ? dispatch(categoryCreatedFailed(error.response.data.message))
            : dispatch(
                  categoryCreatedFailed(error.response.data.error.message),
              );
    }
};

export const removeCategory = (payload) => async (dispatch) => {
    dispatch(categoryRemoveRequested());
    try {
        await categoryService.remove(payload);
        dispatch(categoryRemovedSuccess(payload));
    } catch (e) {
        dispatch(categoryRemovedFailed(e.message));
    }
};

export const getCategory = () => (state) => state.categories.entities;
export const getCategoryErrors = () => (state) => state.categories.error;

export default categoriesReducer;
