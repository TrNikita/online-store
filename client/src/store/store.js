import {combineReducers, configureStore} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import productsReducer from './productsSlice';
import usersReducer from './usersSlice';
import brandsReducer from './brandSlice';
import categoryReducer from './categorySlice';

const rootReducer = combineReducers({
    counter: counterReducer,
    products: productsReducer,
    users: usersReducer,
    brands: brandsReducer,
    category: categoryReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});
