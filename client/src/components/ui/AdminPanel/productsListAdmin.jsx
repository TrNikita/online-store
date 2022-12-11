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
        console.log('products', products);
        return (
            <div className='overflow-x-auto'>
                <table className='table table-compact w-full'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
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
                                <td>{u.name}</td>
                                <td>{u.email}</td>
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
