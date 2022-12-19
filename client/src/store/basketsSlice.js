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
        basketCreatedSuccess: (state, action) => {
            if (!Array.isArray(state.entities)) state.entities = [];
            state.entities.push(action.payload);
        },
        basketCreatedFailed: (state, action) => {
            state.error = action.payload;
        },
        basketRemovedFailed: (state, action) => {
            state.error = action.payload;
        },
        basketRemovedSuccess: (state, action) => {
            const index = state.entities.findIndex(
                (p) => p._id === action.payload,
            );
            state.entities.splice(index, 1);
        },
        basketUpdateSuccessed: (state, action) => {
            state.entities[
                state.entities.findIndex((p) => p._id === action.payload._id)
            ] = action.payload;
        },
    },
});

const {reducer: basketsReducer, actions} = basketsSlice;

const {
    basketsRequested,
    basketsReceived,
    basketsRequestFailed,
    basketCreatedSuccess,
    basketCreatedFailed,
    basketRemovedFailed,
    basketRemovedSuccess,
    // basketUpdateSuccessed,
} = actions;

const basketCreateRequested = createAction('baskets/basketCreateRequested');
const basketRemoveRequested = createAction('baskets/basketRemoveRequested');
// const basketUpdateRequested = createAction('baskets/basketUpdateRequested');
// const basketUpdateFailed = createAction('baskets/basketUpdateFailed');

export const loadBasketsList = () => async (dispatch) => {
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
    dispatch(basketCreateRequested());
    try {
        const {content} = await basketService.create({...payload});
        console.log('content', content);
        dispatch(basketCreatedSuccess(content));
    } catch (error) {
        console.log('error', error);
        error.response.data.message
            ? dispatch(basketCreatedFailed(error.response.data.message))
            : dispatch(basketCreatedFailed(error.response.data.error.message));
    }
};

export const removeProductFromBasket = (payload) => async (dispatch) => {
    dispatch(basketRemoveRequested());
    try {
        await basketService.remove(payload);
        dispatch(basketRemovedSuccess(payload));
    } catch (e) {
        dispatch(basketRemovedFailed(e.message));
    }
};

export const getBasketByUserId = (userId) => (state) => {
    if (state.baskets.entities)
        return state.basket.entities.find((b) => b.userId === userId);
};

export default basketsReducer;
