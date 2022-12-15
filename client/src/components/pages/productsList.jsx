import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getProducts, loadProductsList} from '../../store/productsSlice';
import {useParams} from 'react-router-dom';
import ProductCard from '../ui/productCard';
import {getCategories, loadCategoriesList} from '../../store/categoriesSlice';

const ProductsList = () => {
    const params = useParams();
    console.log('params', params);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadProductsList());
        dispatch(loadCategoriesList());
    }, []);
    const products = useSelector(getProducts());
    const categories = useSelector(getCategories());

    if (products && categories) return <ProductCard products={products} categories={categories} />;
};

export default ProductsList;
