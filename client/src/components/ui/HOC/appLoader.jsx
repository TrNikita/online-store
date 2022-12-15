import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {loadProductsList} from '../../../store/productsSlice';
import {loadCategoriesList} from '../../../store/categoriesSlice';

const AppLoader = ({children}) => {
    const dispatch = useDispatch();

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
