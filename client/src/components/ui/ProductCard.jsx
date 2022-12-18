import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductCard = ({products, categories}) => {
    const windowInnerWidth = document.documentElement.clientWidth;

    return (
        <>
            {products.map((p) => (
                <div key={p._id} className='overflow-x-auto w-full'>
                    <table className='table w-full text-center'>
                        <tbody>
                            <tr>
                                <td className='w-3/5'>
                                    <div className='flex items-center space-x-3 text-start'>
                                        {windowInnerWidth > 750 ? (
                                            <Link to={`/products/${p._id}`}>
                                                <div className='w-36 flex justify-center hover:transition ease-in-out delay-150 hover:scale-110 hover:duration-300'>
                                                    <img
                                                        className='mask mask-squircle max-h-28'
                                                        src={p.imgUrl}
                                                        alt='img'
                                                    />
                                                </div>
                                            </Link>
                                        ) : null}
                                        <div>
                                            <div className='flex'>
                                                <Link to={`/products/${p._id}`}>
                                                    <div className='font-bold px-1 text-xl break-normal whitespace-pre-wrap hover:text-red-500 hover:duration-200'>
                                                        {p.name}
                                                    </div>
                                                </Link>
                                                {p.tags ? (
                                                    <div className='badge badge-info p-2 m-1'>
                                                        {p.tags}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <br />
                                            <div className='badge badge-outline m-1'>
                                                {p.brand}
                                            </div>
                                            <div className='badge badge-outline'>
                                                {p.year}
                                            </div>
                                            <br />
                                            <span className='badge badge-ghost badge-sm'>
                                                {
                                                    categories.find(
                                                        (c) =>
                                                            c.name ===
                                                            p.category,
                                                    )?.name
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                {windowInnerWidth > 1000 ? (
                                    <td className='text-xs break-normal whitespace-pre-wrap w-1/5 m-1 p-1'>
                                        {p.description}
                                    </td>
                                ) : null}
                                <th className='w-1/5'>
                                    <div className='flex m-2 justify-center'>
                                        <p
                                            className={
                                                'text-xl' +
                                                (p.prevPrice
                                                    ? ' text-red-500'
                                                    : '')
                                            }
                                        >
                                            {Number(p.price).toLocaleString()} ₽
                                        </p>
                                        {p.prevPrice ? (
                                            <>
                                                <div className='text-s font-normal line-through italic text-gray-500 p-1'>
                                                    {Number(
                                                        p.prevPrice,
                                                    ).toLocaleString()}{' '}
                                                    ₽
                                                </div>
                                                <div className='badge badge-secondary p-2 m-1'>
                                                    {Math.round(
                                                        (p.price / p.prevPrice -
                                                            1) *
                                                            100,
                                                    )}
                                                    %
                                                </div>
                                            </>
                                        ) : null}
                                    </div>
                                    <button
                                        className={
                                            'btn hover:transition ease-in-out delay-50 hover:scale-105 hover:duration-150 hover:text-accent' +
                                            (windowInnerWidth > 750
                                                ? ' btn-wide'
                                                : null)
                                        }
                                    >
                                        В корзину
                                    </button>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                    <div className='divider m-2'></div>
                </div>
            ))}
        </>
    );
};

ProductCard.propTypes = {
    products: PropTypes.array,
    categories: PropTypes.array,
};

export default ProductCard;
