import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {createProduct, getProducts} from '../../../store/productsSlice';
import {getCategory, loadCategoriesList} from '../../../store/categoriesSlice';
import AvatarLoader from '../Loaders/avatarLoader';
import {dateAfterPost} from '../../../utils/dateAfterPost';
import ProductTableAdmin from './productTableAdmin';

const ProductsListAdmin = () => {
    const handleUpdateUser = (user) => {
        console.log('user', user);
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCategoriesList());
    }, []);

    const categories = useSelector(getCategory());
    const products = useSelector(getProducts());

    const tags = ['', 'New', 'Выгодно', 'Успевай'];

    const [data, setData] = useState({
        name: '',
        category: '',
        brand: '',
        year: 2020,
        prevPrice: '',
        price: '',
        tags: '',
        description: '',
    });

    const handleCreateProduct = (product) => {
        dispatch(createProduct(product));
    };

    const handleChange = ({target}) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };
    console.log('data', data);

    function findCategory(category) {
        const findCategory = categories.find((c) => c._id === category);
        return findCategory ? findCategory.name : 'Без категории';
    }

    if (!products || !categories) return <AvatarLoader />;
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
                        <th>Теги</th>
                        <th>Описание</th>
                        <th>Создан</th>
                        <th>Обновлен</th>
                        <th>Обновить</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p, index) => (
                        <tr key={p._id}>
                            <th>{index + 1}</th>
                            <th>
                                <div className='flex items-center space-x-3'>
                                    <div className='avatar'>
                                        <div className='mask mask-squircle w-12 h-12'>
                                            <img
                                                src='/tailwind-css-component-profile-2@56w.png'
                                                alt='img'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </th>
                            <td>{p.name}</td>
                            <td>{findCategory(p.category)}</td>
                            <td>{p.brand}</td>
                            <td>{p.year}</td>
                            <td>{p.prevPrice}</td>
                            <td>{p.price}</td>
                            <td>{p.tags}</td>
                            <td className='text-xs whitespace-normal'>
                                {p.description}
                            </td>
                            <td>{dateAfterPost(p.createdAt)}</td>
                            <td>{dateAfterPost(p.updatedAt)}</td>
                            <td>
                                <button
                                    className='btn btn-ghost btn-xs'
                                    onClick={() => handleUpdateUser(p)}
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
                    <tr>
                        <td></td>
                        <td></td>
                        <td>
                            <input
                                id='name'
                                type='text'
                                className='input input-bordered input-md w-full max-w-xs'
                                value={data.name}
                                placeholder='Введите название продукта'
                                name='name'
                                onChange={handleChange}
                            />
                        </td>
                        <td>
                            <select
                                className='select select-bordered w-full max-w-xs'
                                id='category'
                                name='category'
                                value={data.category}
                                onChange={handleChange}
                            >
                                <option disabled value=''>
                                    Выберите категорию
                                </option>
                                {categories.map((c) => (
                                    <option key={c._id} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <input
                                type='text'
                                className='input input-bordered input-md w-full max-w-xs'
                                value={data.brand}
                                placeholder='Введите название бренда'
                                name='brand'
                                onChange={handleChange}
                            />
                        </td>
                        <td>
                            <input
                                id='year'
                                type='number'
                                className='input input-bordered input-md w-full max-w-xs'
                                value={data.year}
                                placeholder='Введите название'
                                name='year'
                                onChange={handleChange}
                            />
                        </td>
                        <td>
                            <input
                                id='prevPrice'
                                type='number'
                                className='input input-bordered input-md w-full max-w-xs'
                                value={data.prevPrice}
                                placeholder='Введите прошлую цену'
                                name='prevPrice'
                                onChange={handleChange}
                            />
                        </td>
                        <td>
                            <input
                                id='price'
                                type='number'
                                className='input input-bordered input-md w-full max-w-xs'
                                value={data.price}
                                placeholder='Введите цену'
                                name='price'
                                onChange={handleChange}
                            />
                        </td>
                        <td>
                            <select
                                className='select select-bordered w-full max-w-xs'
                                id='tags'
                                name='tags'
                                value={data.tags}
                                onChange={handleChange}
                            >
                                <option disabled value=''>
                                    Выберите теги
                                </option>
                                {tags.map((t) => (
                                    <option key={t}>{t}</option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <input
                                id='description'
                                type='text'
                                className='input input-bordered input-md w-full max-w-xs'
                                value={data.description}
                                placeholder='Введите описание'
                                name='description'
                                onChange={handleChange}
                            />
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <button
                                className='btn btn-ghost btn-xs'
                                onClick={() => handleCreateProduct(data)}
                            >
                                Создать
                            </button>
                        </td>
                    </tr>

                    {products.map((p, index) => (
                        <tr key={p._id}>
                            <ProductTableAdmin product={p} index={index} />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

ProductsListAdmin.propTypes = {
    products: PropTypes.array,
};

export default ProductsListAdmin;
