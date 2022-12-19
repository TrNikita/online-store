import {combineReducers, configureStore} from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import usersReducer from './usersSlice';
import brandsReducer from './brandSlice';
import categoriesReducer from './categoriesSlice';
import basketsReducer from './basketsSlice';

const rootReducer = combineReducers({
    products: productsReducer,
    users: usersReducer,
    brands: brandsReducer,
    categories: categoriesReducer,
    baskets: basketsReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});
