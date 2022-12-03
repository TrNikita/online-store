import React from 'react';
import {useLocation, useParams} from 'react-router-dom';

const ProductEditPage = () => {
    const {productId} = useParams();
    const location = useLocation();

    console.log('productId', productId);
    console.log('location', location);
    return <div>Edit</div>;
};

export default ProductEditPage;
