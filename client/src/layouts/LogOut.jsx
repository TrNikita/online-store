import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {logOut} from '../store/usersSlice';
import HomePage from '../components/pages/HomePage';
const LogOut = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logOut());
    }, []);
    return <HomePage />;
};

export default LogOut;
