import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {removeUser, updateUser} from '../../../store/usersSlice';
import {useDispatch} from 'react-redux';
import TextFieldAdminPanel from '../../common/form/textFieldAdminPanel';
import {dateAfterPost} from '../../../utils/dateAfterPost';

const UserTable = ({user, index}) => {
    const dispatch = useDispatch();

    const [data, setData] = useState(user);

    const handleChange = ({target}) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    const handleDeleteUser = (user) => {
        dispatch(removeUser(user._id));
    };
    const handleUpdateUser = () => {
        dispatch(updateUser(data));
    };

    return (
        <>
            <th>{index + 1}</th>
            <TextFieldAdminPanel
                data={data}
                dataValue={data.name}
                objectValue={user.name}
                handleChange={handleChange}
            />
            <TextFieldAdminPanel
                data={data}
                dataValue={data.email}
                objectValue={user.email}
                handleChange={handleChange}
            />
            <td>{dateAfterPost(user.createdAt)}</td>
            <td>{dateAfterPost(user.updatedAt)}</td>
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
