import React from 'react';

const ProductCardLoader = () => {
    return (
        <div className='flex justify-center m-14 w-4/5'>
            <div className='card card-side flex bg-base-100 shadow-xl'>
                <div className='py-6 m-4 w-2/5 text-transparent bg-slate-200 rounded-xl animate-pulse'>
                    img img img img img img img img
                </div>
                <div className='card-body w-3/5'>
                    <h2 className='card-title text-transparent'>
                        product.name
                    </h2>
                    <div className='card-actions justify-start'>
                        <div className='badge badge-ghost badge-lg text-transparent animate-pulse'>
                            product.brand
                        </div>
                        <div className='badge badge-ghost badge-lg text-transparent animate-pulse'>
                            product.year
                        </div>
                    </div>
                    <span className='badge badge-ghost badge-lg text-transparent animate-pulse'>
                        category
                    </span>
                    <p className='badge badge-ghost badge-ghost text-transparent animate-pulse'>
                        product.description product.description
                        product.description product.description
                    </p>
                    <p className='badge badge-ghost badge-ghost text-transparent animate-pulse'>
                        product.description product.description
                    </p>{' '}
                    <p className='badge badge-ghost badge-ghost text-transparent animate-pulse'>
                        product.description product
                    </p>
                    <div className='flex justify-start m-2'>
                            <div className='badge badge-secondary text-transparent animate-pulse p-4'>
                            product.price
                        </div>
                    </div>
                    <button className='btn loading'>Loading</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCardLoader;
