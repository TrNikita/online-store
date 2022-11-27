import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getProducts, loadProductsList} from '../../store/productsSlice';
import {Link} from 'react-router-dom';

const ProductsList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadProductsList());
    }, []);
    const products = useSelector(getProducts());
    console.log('products', products);
    if (products)
        return (
            <div className='flex flex-wrap justify-center'>
                {products.map((p) => (
                    <div
                        key={p._id}
                        className='card w-72 bg-base-100 shadow-xl m-1 p-0'
                    >
                        <Link to={`${p._id}`}>
                            <figure>
                                <img
                                    src='https://placeimg.com/400/225/arch'
                                    alt='Img'
                                />
                            </figure>
                        </Link>
                        <div className='card-body px-2 py-1'>
                            <h2 className='card-title'>
                                <Link to={`${p._id}`}>{p.title}</Link>
                                {p.tags ? (
                                    <div className='badge badge-secondary'>
                                        {p.tags}
                                    </div>
                                ) : null}
                                {p.prevPrice ? (
                                    <div className='badge badge-secondary'>
                                        Акция
                                    </div>
                                ) : null}
                            </h2>
                            <div className='card-actions justify-start'>
                                <div className='badge badge-outline'>
                                    {p.brand}
                                </div>
                                <div className='badge badge-outline'>
                                    {p.year}
                                </div>
                            </div>
                            <div className='card-actions justify-between'>
                                <div className='flex py-2'>
                                    <p className='text-xl px-2'>{p.price}$</p>
                                    {p.prevPrice ? (
                                        <p className='text-xl line-through italic text-gray-500'>
                                            {p.prevPrice}$
                                        </p>
                                    ) : null}
                                </div>
                                <button className='btn btn-primary'>
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
};

export default ProductsList;
