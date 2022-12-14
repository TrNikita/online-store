import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    getIsLoggedIn,
    getUsersLoadingStatus,
    loadUsersList,
} from '../../../store/usersSlice';
import PropTypes from 'prop-types';

const AppLoader = ({children}) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const usersStatusLoading = useSelector(getUsersLoadingStatus());
    console.log('usersStatusLoading', usersStatusLoading);
    useEffect(() => {
        if (isLoggedIn) dispatch(loadUsersList());
    }, [isLoggedIn]);
    if (usersStatusLoading) return 'loading';
    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default AppLoader;
