import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {removeUser, updateUser} from '../../../store/usersSlice';
import {useDispatch} from 'react-redux';

const UserTable = ({user, index}) => {
    console.log('user', user);

    const dispatch = useDispatch();
    const [data, setData] = useState(user);

    const handleDeleteUser = (user) => {
        dispatch(removeUser(user._id));
    };

    const handleUpdateUser = () => {
        dispatch(updateUser(data));
    };

    const handleChange = ({target}) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
        console.log('data', data);
    };

    return (
        <>
            <th>{index + 1}</th>
            <td>
                <input
                    type='text'
                    className='input w-full max-w-xs'
                    value={data.name || user.name}
                    name='name'
                    onChange={handleChange}
                />
            </td>
            <td>{user.email}</td>
            <td>{user.created_at}</td>
            <td>{user.updatedAt}</td>
            <td>
                <button
                    className='btn btn-ghost btn-xs'
                    onClick={() => handleUpdateUser(user)}
                >
                    Обновить
                </button>
            </td>
            <td>
                <button
                    className='btn btn-ghost btn-xs'
                    onClick={() => handleDeleteUser(user)}
                >
                    Удалить
                </button>
            </td>
        </>
    );
};

UserTable.propTypes = {
    user: PropTypes.object,
    index: PropTypes.number,
};

export default UserTable;
