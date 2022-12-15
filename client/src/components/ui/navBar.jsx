import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getIsLoggedIn, loadUsersList} from '../../store/usersSlice';
import Avatar from './NavBar/avatar';
import Basket from './NavBar/basket';
import SearchField from './NavBar/searchField';
import Menu from './NavBar/menu';
import Breadcrumbs from './breadcrumbs';
import HeaderNavigation from './headerNavigation';
// eslint-disable-next-line no-unused-vars
import {getCategories, loadCategoriesList} from '../../store/categoriesSlice';

const NavBar = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadUsersList());
        // dispatch(loadCategoriesList());
    }, []);

    const isLoggedIn = useSelector(getIsLoggedIn());
    const categories = useSelector(getCategories());

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
                <SearchField />
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
            {categories ? <HeaderNavigation categories={categories} /> : null}
        </>
    );
};

export default NavBar;
