import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {loadProductsList} from '../../../store/productsSlice';
import {loadCategoriesList} from '../../../store/categoriesSlice';
import {getIsLoggedIn, loadUsersList} from '../../../store/usersSlice';

const AppLoader = ({children}) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());

    useEffect(() => {
        dispatch(loadUsersList());
    }, [isLoggedIn]);

    useEffect(() => {
        dispatch(loadProductsList());
        dispatch(loadCategoriesList());
    }, []);

    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default AppLoader;
