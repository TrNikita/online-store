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
import HeaderNavigation from './HeaderNavigation';
import {getCategory, loadCategoryList} from '../../store/categorySlice';

const Navbar = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadUsersList());
        dispatch(loadCategoryList());
    }, []);

    const user = useSelector(getUserById(2));
    const category = useSelector(getCategory());

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
            <HeaderNavigation category={category} />
        </>
    );
};

export default Navbar;
