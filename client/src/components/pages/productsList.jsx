import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
// eslint-disable-next-line no-unused-vars
import {getProducts, loadProductsList} from '../../store/productsSlice';
import {useParams} from 'react-router-dom';
import ProductCard from '../ui/productCard';
// eslint-disable-next-line no-unused-vars
import {getCategories, loadCategoriesList} from '../../store/categoriesSlice';

const ProductsList = () => {
    const params = useParams();
    // const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(loadProductsList());
        // dispatch(loadCategoriesList());
    }, []);

    const products = useSelector(getProducts());
    const categories = useSelector(getCategories());

    function sortedByCategory(products) {
        if (params.categoryId) {
            const categoryId = categories.find(
                (c) => c.path === params.categoryId,
            )._id;
            return products.filter((p) => p.category === categoryId);
        }
        return products;
    }

    if (products && categories)
        return (
            <ProductCard
                products={sortedByCategory(products)}
                categories={categories}
            />
        );
};

export default ProductsList;
