import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Avatar = memo(({user}) => {
    const userNameArr = user.name.split(' ');
    const letters =
        userNameArr.length === 2
            ? userNameArr[0][0] + userNameArr[1][0]
            : userNameArr[0][0];

    const getAvatarClasses = () => {
        return (
            'btn bg-neutral-focus text-neutral-content rounded-full w-12' +
            (user.role === 'ADMIN' ? ' ring ring-red-600 ring-offset-2' : '')
        );
    };

    return (
        <div className='dropdown dropdown-end'>
            <div className='avatar placeholder'>
                <label tabIndex={0} className={getAvatarClasses()}>
                    <span className='text-xl'>{letters}</span>
                </label>
            </div>

            <ul
                tabIndex={0}
                className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
            >
                <li>
                    <a className='justify-between'>
                        Profile
                        <span className='badge'>+1</span>
                    </a>
                </li>
                <li>
                    <Link to='logout'>Logout</Link>
                </li>
                {user.role === 'ADMIN' ? (
                    <li>
                        <Link to='adminpanel'>Панель администратора</Link>
                    </li>
                ) : null}
            </ul>
        </div>
    );
});

Avatar.propTypes = {
    user: PropTypes.object,
};

export default Avatar;
