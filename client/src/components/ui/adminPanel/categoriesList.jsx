import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {getCategory, removeCategory} from '../../../store/categoriesSlice';

const CategoriesList = () => {
    const dispatch = useDispatch();
    const categories = useSelector(getCategory());

    const handleDeleteCategory = (category) => {
        dispatch(removeCategory(category._id));
    };

    if (categories) {
        console.log('categories', categories);
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
                                <td>{c.createdAt}</td>
                                <td>{c.updatedAt}</td>
                                <td>
                                    <button
                                        className='btn btn-ghost btn-xs'
                                        onClick={() => handleDeleteCategory(c)}
                                    >
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

CategoriesList.propTypes = {
    categories: PropTypes.array,
};

export default CategoriesList;
