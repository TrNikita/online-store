import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getIsLoggedIn, loadUsersList} from '../../store/usersSlice';
import Avatar from './NavBar/avatar';
import Basket from './NavBar/basket';
import Search from './NavBar/search';
import Menu from './NavBar/menu';
import Breadcrumbs from './breadcrumbs';
import HeaderNavigation from './headerNavigation';
import {getCategory, loadCategoriesList} from '../../store/categoriesSlice';

const NavBar = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadUsersList());
        dispatch(loadCategoriesList());
    }, []);

    const isLoggedIn = useSelector(getIsLoggedIn());
    const categories = useSelector(getCategory());

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
                {isLoggedIn ? (
                    <>
                        <Basket />
                        <Avatar />
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
