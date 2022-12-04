import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUserById, loadUsersList} from '../../../store/usersSlice';

const Avatar = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadUsersList());
    }, []);
    const user = useSelector(getUserById(2));

    const userNameArr = user.name.split(' ');
    const letters =
        userNameArr.length === 2
            ? userNameArr[0][0] + userNameArr[1][0]
            : userNameArr[0][0];

    return (
        <div className='dropdown dropdown-end'>
            <div className='avatar placeholder'>
                <label
                    tabIndex={0}
                    className=' btn bg-neutral-focus text-neutral-content rounded-full w-12'
                >
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
                    <a>Settings</a>
                </li>
                <li>
                    <a>Logout</a>
                </li>
            </ul>
        </div>
    );
};

export default Avatar;
