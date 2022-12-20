import {createAction, createSlice} from '@reduxjs/toolkit';
import basketService from '../services/basket.service';

const initialState = {
    entities: null,
    isLoading: true,
    error: null,
};

const basketsSlice = createSlice({
    name: 'baskets',
    initialState,
    reducers: {
        basketsRequested: (state) => {
            state.isLoading = true;
        },
        basketsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        basketsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        basketAddSuccess: (state, action) => {
            if (!Array.isArray(state.entities)) state.entities = [];
            state.entities.push(action.payload);
        },
        basketAddFailed: (state, action) => {
            state.error = action.payload;
        },
        basketRemovedSuccess: (state, action) => {
            const index = state.entities.findIndex((p) => p === action.payload);
            state.entities.splice(index, 1);
        },
        basketRemovedFailed: (state, action) => {
            state.error = action.payload;
        },
    },
});

const {reducer: basketsReducer, actions} = basketsSlice;

const {
    basketsRequested,
    basketsReceived,
    basketsRequestFailed,
    basketAddSuccess,
    basketAddFailed,
    basketRemovedFailed,
    basketRemovedSuccess,
} = actions;

const basketAddRequested = createAction('baskets/basketCreateRequested');
const basketRemoveRequested = createAction('baskets/basketRemoveRequested');

export const loadBasket = () => async (dispatch) => {
    dispatch(basketsRequested());
    try {
        const {content} = await basketService.get();
        console.log('content', content);
        dispatch(basketsReceived(content));
    } catch (e) {
        dispatch(basketsRequestFailed(e.message));
    }
};

export const addProductToBasket = (payload) => async (dispatch) => {
    dispatch(basketAddRequested());
    try {
        console.log('payload', payload);
        const {content} = await basketService.add(payload);
        console.log('content', content);
        dispatch(basketAddSuccess(content.products));
    } catch (e) {
        console.log('e', e);
        dispatch(basketAddFailed(e.message));
    }
};

export const removeProductFromBasket = (payload) => async (dispatch) => {
    dispatch(basketRemoveRequested());
    try {
        console.log('payload', payload);
        await basketService.remove(payload);
        dispatch(basketRemovedSuccess(payload));
    } catch (e) {
        dispatch(basketRemovedFailed(e.message));
    }
};

export const getBasket = () => (state) => state.baskets.entities;

export default basketsReducer;
