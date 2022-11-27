import {combineReducers, configureStore} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import productsReducer from './productsSlice';
import usersReducer from './usersSlice';

const rootReducer = combineReducers({
    counter: counterReducer,
    products: productsReducer,
    users: usersReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});
