import React from 'react';
import {Link, useParams} from 'react-router-dom';

const ProductPage = () => {
    const {productId} = useParams();

    return (
        <>
            <div>{productId}</div>
            <Link to='edit'>Edit</Link>
        </>
    );
};

export default ProductPage;
