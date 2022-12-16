import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {
    createProduct,
    getProductErrors,
    getProducts,
} from '../../../store/productsSlice';
import {getCategories} from '../../../store/categoriesSlice';
import ProductTableAdmin from './ProductTableAdmin';
import {generateCreateError} from '../../../utils/generateCreateError';
import AdminPanelLoader from '../Loaders/AdminPanelLoader';

const ProductsListAdmin = () => {
    const dispatch = useDispatch();

    const categories = useSelector(getCategories());
    const products = useSelector(getProducts());
    const createProductError = useSelector(getProductErrors());

    const tags = ['', 'New', 'Выгодно', 'Акция'];

    const [data, setData] = useState({
        name: '',
        category: '',
        brand: '',
        year: 2020,
        prevPrice: '',
        price: '',
        tags: '',
        description: '',
        imgUrl: '',
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
    if (!products || !categories) return <AdminPanelLoader />;

    return (
        <div className='overflow-x-auto'>
            <table className='table table-compact w-full'>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Image</th>
                        <th>Image Url</th>
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
                            <ProductTableAdmin
                                product={p}
                                index={index}
                                categories={categories}
                            />
                        </tr>
                    ))}
                    <tr>
                        <td></td>
                        <td></td>
                        <td>
                            <input
                                id='imgUrl'
                                type='text'
                                className='input input-bordered input-md w-full max-w-xs'
                                value={data.imgUrl}
                                placeholder='Введите url картинки'
                                name='imgUrl'
                                onChange={handleChange}
                            />
                        </td>
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
                                className='btn btn-xs'
                                onClick={() => handleCreateProduct(data)}
                            >
                                Создать
                            </button>
                        </td>
                    </tr>
                    {createProductError ? (
                        <tr>
                            <td></td>
                            <td></td>
                            <td className='text-xs text-red-500 italic'>
                                {generateCreateError(createProductError)}
                            </td>
                        </tr>
                    ) : null}
                </tbody>
            </table>
        </div>
    );
};

ProductsListAdmin.propTypes = {
    products: PropTypes.array,
};

export default ProductsListAdmin;
