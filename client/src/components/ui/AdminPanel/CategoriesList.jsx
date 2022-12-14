import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {
    createCategory,
    getCategories,
    getCategoryErrors,
    removeCategory,
} from '../../../store/categoriesSlice';
import {generateCreateError} from '../../../utils/generateCreateError';
import {dateAfterPost} from '../../../utils/dateAfterPost';

const CategoriesList = () => {
    const dispatch = useDispatch();
    const categories = useSelector(getCategories());
    const createCategoryError = useSelector(getCategoryErrors());

    const handleDeleteCategory = (category) => {
        dispatch(removeCategory(category._id));
    };

    const handleCreateCategory = (category) => {
        dispatch(createCategory(category));
    };

    const [data, setData] = useState({name: ''});

    const handleChange = ({target}) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    if (categories)
        return (
            <div className='overflow-x-auto'>
                <table className='table table-compact w-full'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Path</th>
                            <th>Создан</th>
                            <th>Обновлен</th>
                            <th>Удалить</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((c, index) => (
                            <tr key={c._id}>
                                <th>{index + 1}</th>
                                <td>{c.name}</td>
                                <td>{c.path}</td>
                                <td className='text-xs'>{dateAfterPost(c.createdAt)}</td>
                                <td className='text-xs'>{dateAfterPost(c.updatedAt)}</td>
                                <td>
                                    <button
                                        className='btn btn-xs'
                                        onClick={() => handleDeleteCategory(c)}
                                    >
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td></td>
                            <td>
                                <input
                                    type='text'
                                    className='input input-bordered input-md w-full max-w-xs'
                                    value={data.name}
                                    placeholder='Введите название категории'
                                    name='name'
                                    onChange={handleChange}
                                />
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <button
                                    className='btn btn-xs'
                                    onClick={() => handleCreateCategory(data)}
                                >
                                    Создать
                                </button>
                            </td>
                        </tr>
                        {createCategoryError ? (
                            <tr>
                                <td></td>
                                <td className='text-xs text-red-500 italic'>
                                    {generateCreateError(createCategoryError)}
                                </td>
                            </tr>
                        ) : null}
                    </tbody>
                </table>
            </div>
        );
};

CategoriesList.propTypes = {
    categories: PropTypes.array,
};

export default CategoriesList;
