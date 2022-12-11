import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
    getCurrentUserData,
    // getIsLoggedIn,
    loadUsersList,
} from '../../store/usersSlice';
import Avatar from './NavBar/avatar';
import Basket from './NavBar/basket';
import Search from './NavBar/search';
import Menu from './NavBar/menu';
import Breadcrumbs from './breadcrumbs';
import HeaderNavigation from './headerNavigation';
import {getCategory, loadCategoriesList} from '../../store/categoriesSlice';

const NavBar = () => {
    const dispatch = useDispatch();
    const user = useSelector(getCurrentUserData());

    useEffect(() => {
        dispatch(loadUsersList());
        dispatch(loadCategoriesList());
    }, []);

    const categories = useSelector(getCategory());
    // const isLoggedIn = useSelector(getIsLoggedIn());

    return (
        <>
            <Breadcrumbs />
            <div className='navbar bg-base-100'>
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
                        <Avatar user={user} />
                    </>
                ) : (
                    <Link to='login' className='btn'>
                        Войти
                    </Link>
                )}
            </div>
            <HeaderNavigation categories={categories} />
        </>
    );
};

export default NavBar;
