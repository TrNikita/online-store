import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getUserById, loadUsersList} from '../../store/usersSlice';
import Avatar from './NavBar/Avatar';
import LoginButton from './NavBar/LoginButton';
import Basket from './NavBar/Basket';
import Search from './NavBar/Search';
import Menu from './NavBar/Menu';
import Breadcrumbs from './Breadcrumbs';

const Navbar = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadUsersList());
    }, []);

    const user = useSelector(getUserById(2));
    return (
        <>
            <Breadcrumbs user={user} />
            <div className='navbar bg-base-100 border-2'>
                <Menu />
                <div className='flex-1'>
                    <Link to='/' className='btn btn-ghost normal-case text-xl'>
                        На главную
                    </Link>
                </div>
                <Search />
                {user ? (
                    <>
                        <Basket />
                        <Avatar />
                    </>
                ) : (
                    <LoginButton />
                )}
            </div>
        </>
    );
};

export default Navbar;
