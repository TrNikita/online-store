import React from 'react';
import PropTypes from 'prop-types';
import {getUsersList, removeUser} from '../../../store/usersSlice';
import {useDispatch, useSelector} from 'react-redux';

const UsersList = () => {
    const dispatch = useDispatch();
    const users = useSelector(getUsersList());

    const handleDeleteUser = (user) => {
        dispatch(removeUser(user._id));
    };

    const handleUpdateUser = (user) => {
        console.log('user', user);
    };

    if (users) {
        const usersWOAdmin = users.filter((u) => u.role === 'USER');
        console.log('usersWOAdmin', Array.isArray(usersWOAdmin));
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
                        {usersWOAdmin.map((u, index) => (
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
                                    <button
                                        className='btn btn-ghost btn-xs'
                                        onClick={() => handleDeleteUser(u)}
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

UsersList.propTypes = {
    users: PropTypes.array,
};

export default UsersList;
