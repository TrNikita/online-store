import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getProducts, loadProductsList} from '../../store/productsSlice';
import {useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductCard from '../ui/productCard';

const ProductsList = () => {
    const params = useParams();
    console.log('params', params);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadProductsList());
    }, []);
    const products = useSelector(getProducts());

    if (products) return <ProductCard products={products} />;
};

ProductsList.propTypes = {
    category: PropTypes.string,
};

export default ProductsList;
