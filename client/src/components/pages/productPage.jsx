import React from 'react';
import {Link, useParams} from 'react-router-dom';

const ProductPage = () => {
    // const navigate = useNavigate();
    // console.log('navigate', navigate);
    const {productId} = useParams();
    // const location = useLocation();

    // console.log('productId', productId);
    // console.log('location', location);
    return (
        <>
            <div>{productId}</div>
            <Link to='edit'>Edit</Link>
        </>
    );
};

export default ProductPage;
