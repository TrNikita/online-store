import React from 'react';
import PropTypes from 'prop-types';
import {getUsersList} from '../../../store/usersSlice';
import {useSelector} from 'react-redux';
import UserTable from './userTable';

const UsersList = () => {
    const users = useSelector(getUsersList());

    if (users) {
        const usersWOAdmin = users.filter((u) => u.role === 'USER');

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
                                <UserTable user={u} index={index} />
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
