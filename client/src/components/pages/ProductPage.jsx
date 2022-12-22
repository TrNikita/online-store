import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getProductById} from '../../store/productsSlice';
import {useParams} from 'react-router-dom';
import {getCategories} from '../../store/categoriesSlice';
import ProductCardLoader from '../ui/Loaders/ProductCardLoader';
import {
    addProductToBasket,
    getBasket,
    removeProductFromBasket,
} from '../../store/basketsSlice';

const ProductPage = () => {
    const dispatch = useDispatch();

    const {productId} = useParams();
    const product = useSelector(getProductById(productId));
    const category = useSelector(getCategories());
    const basket = useSelector(getBasket());

    const handleClickAdd = async (product) => {
        const addedProductToBasket = {products: product._id};
        dispatch(addProductToBasket(addedProductToBasket));
    };
    const handleClickRemove = async (product) => {
        const removedProductFromBasket = {products: product._id};
        dispatch(removeProductFromBasket(removedProductFromBasket));
    };

    function isProductInBasket(product) {
        return basket.some((p) => p === product._id);
    }

    function productsInBasketCount(product) {
        const productsInBasket = basket?.filter((p) => p === product._id);
        return productsInBasket.length;
    }

    return product ? (
        <>
            <div className='flex justify-center m-14'>
                <div className='card card-side flex bg-base-100 shadow-xl'>
                    <div className='py-6 m-4 w-2/5'>
                        <figure>
                            <img src={product.imgUrl} alt='img' />
                        </figure>
                    </div>
                    <div className='card-body w-3/5'>
                        <h2 className='card-title text-2xl'>
                            {product.name}
                            {product.tags ? (
                                <div className='badge badge-secondary'>
                                    {product.tags}
                                </div>
                            ) : null}
                        </h2>
                        <div className='card-actions justify-start'>
                            <div className='badge badge-outline badge-lg'>
                                {product.brand}
                            </div>
                            <div className='badge badge-outline badge-lg'>
                                {product.year}
                            </div>
                        </div>
                        <span className='badge badge-ghost badge-lg'>
                            {
                                category.find((c) => c._id === product.category)
                                    ?.name
                            }
                        </span>
                        <p>{product.description}</p>

                        <div className='flex justify-end m-2'>
                            <div
                                className={
                                    'text-xl' +
                                    (product.prevPrice
                                        ? ' text-red-500 font-bold'
                                        : '')
                                }
                            >
                                {Number(product.price).toLocaleString()} ₽
                            </div>
                            {product.prevPrice ? (
                                <>
                                    <div className='text-s font-normal line-through italic text-gray-500 p-1'>
                                        {Number(
                                            product.prevPrice,
                                        ).toLocaleString()}{' '}
                                        ₽
                                    </div>
                                    <div className='badge badge-secondary p-2 m-1'>
                                        {Math.round(
                                            (product.price / product.prevPrice -
                                                1) *
                                                100,
                                        )}
                                        %
                                    </div>
                                </>
                            ) : null}
                        </div>
                        <div className='flex justify-end'>
                            {isProductInBasket(product) ? (
                                <button
                                    onClick={() => handleClickRemove(product)}
                                    className='btn btn-xs badge my-2.5 mx-1'
                                >
                                    -
                                </button>
                            ) : null}
                            <div className='indicator'>
                                <button
                                    onClick={() => handleClickAdd(product)}
                                    className={
                                        'btn btn-wide ' +
                                        (!isProductInBasket(product)
                                            ? 'btn-primary'
                                            : 'btn-secondary')
                                    }
                                >
                                    {!isProductInBasket(product)
                                        ? 'В корзину'
                                        : 'Добавить'}
                                    {isProductInBasket(product) ? (
                                        <span className='badge indicator-item'>
                                            {productsInBasketCount(product)}
                                        </span>
                                    ) : null}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) : (
        <ProductCardLoader />
    );
};

export default ProductPage;
