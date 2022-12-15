import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentUserData, loadUsersList} from '../../../store/usersSlice';
import {letters} from '../../../utils/letters';
import AvatarLoader from '../Loaders/avatarLoader';

const Avatar = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUsersList());
    }, []);

    const user = useSelector(getCurrentUserData());

    const getAvatarClasses = () => {
        return (
            'btn bg-neutral-focus text-neutral-content rounded-full w-12' +
            (user.role === 'ADMIN' ? ' ring ring-red-600 ring-offset-2' : '')
        );
    };

    if (!user) return <AvatarLoader />;

    const nameLetters = letters(user.name);
    return (
        <div className='dropdown dropdown-end'>
            <div className='avatar placeholder'>
                <label tabIndex={0} className={getAvatarClasses()}>
                    <span className='text-xl'>{nameLetters}</span>
                </label>
            </div>

            <ul
                tabIndex={0}
                className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
            >
                {user.role === 'ADMIN' ? (
                    <li>
                        <Link to='adminpanel'>Панель администратора</Link>
                    </li>
                ) : null}
                <li>
                    <Link to='logout'>Logout</Link>
                </li>
            </ul>
        </div>
    );
};

Avatar.propTypes = {
    user: PropTypes.object,
};

export default Avatar;
