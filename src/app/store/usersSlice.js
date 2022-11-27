import {createSlice} from '@reduxjs/toolkit';
import api from '../api';

const initialState = {
    entities: null,
    isLoading: true,
    error: null,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

const {reducer: usersReducer, actions} = usersSlice;

const {usersRequested, usersReceived, usersRequestFailed} = actions;

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const content = await api.users.fetchAll();
        dispatch(usersReceived(content));
    } catch (e) {
        dispatch(usersRequestFailed(e.message));
    }
};

export const getUserById = (userId) => (state) => {
    if (state.users.entities)
        return state.users.entities.find((u) => u._id === userId);
};

export default usersReducer;
