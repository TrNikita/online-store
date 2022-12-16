import React from 'react';
import {useSelector} from 'react-redux';
import {getProducts} from '../../store/productsSlice';
import {useParams} from 'react-router-dom';
import ProductCard from '../ui/ProductCard';
import {getCategories} from '../../store/categoriesSlice';

const ProductsList = () => {
    const params = useParams();

    const products = useSelector(getProducts());
    const categories = useSelector(getCategories());

    function sortedByCategory(products) {
        if (params.categoryId) {
            const categoryId = categories.find(
                (c) => c.path === params.categoryId,
            )?._id;

            return categoryId
                ? products.filter((p) => p.category === categoryId)
                : products;
        }
        return products;
    }

    if (products && categories)
        return (
            <div className='hover:transition ease-in-out delay-150 hover:duration-300'>
                <ProductCard
                    products={sortedByCategory(products)}
                    categories={categories}
                />
            </div>
        );
};

export default ProductsList;
