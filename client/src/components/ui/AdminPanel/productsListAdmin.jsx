import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {getProducts} from '../../../store/productsSlice';

const ProductsListAdmin = () => {
    const handleUpdateUser = (user) => {
        console.log('user', user);
    };

    const products = useSelector(getProducts());
    if (products) {
        console.log('productssss', products);
        return (
            <div className='overflow-x-auto'>
                <table className='table table-compact w-full'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Название</th>
                            <th>Категория</th>
                            <th>Бренд</th>
                            <th>Год</th>
                            <th>Прошлая цена</th>
                            <th>Цена</th>
                            <th>Акции</th>
                            <th>Теги</th>
                            <th>Описание</th>
                            <th>Создан</th>
                            <th>Обновлен</th>
                            <th>Обновить</th>
                            <th>Удалить</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((u, index) => (
                            <tr key={u._id}>
                                <th>{index + 1}</th>
                                <th>
                                    <div className='flex items-center space-x-3'>
                                        <div className='avatar'>
                                            <div className='mask mask-squircle w-12 h-12'>
                                                <img
                                                    src='/tailwind-css-component-profile-2@56w.png'
                                                    alt='Avatar Tailwind CSS Component'
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className='font-bold'>
                                                Hart Hagerty
                                            </div>
                                            <div className='text-sm opacity-50'>
                                                United States
                                            </div>
                                        </div>
                                    </div>
                                </th>
                                <td>{u.title}</td>
                                <td>{u.category}</td>
                                <td>{u.brand}</td>
                                <td>{u.year}</td>
                                <td>{u.prevPrice}</td>
                                <td>{u.price}</td>
                                <td>{u.promotion}</td>
                                <td>{u.tags}</td>
                                <td>{u.description}</td>
                                <td>{u.created_at}</td>
                                <td>{u.updatedAt}</td>
                                <td>
                                    <button
                                        className='btn btn-ghost btn-xs'
                                        onClick={() => handleUpdateUser(u)}
                                    >
                                        Обновить
                                    </button>
                                </td>
                                <td>
                                    <button className='btn btn-ghost btn-xs'>
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
};

ProductsListAdmin.propTypes = {
    products: PropTypes.array,
};

export default ProductsListAdmin;
