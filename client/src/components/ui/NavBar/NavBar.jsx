import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {getIsLoggedIn} from '../../../store/usersSlice';
import NavBarAvatar from './NavBarAvatar';
import NavBarBasket from './NavBarBasket';
import NavBarSearchField from './NavBarSearchField';
import Breadcrumbs from '../Breadcrumbs';
import HeaderNavigation from '../HeaderNavigation';
import {getCategories} from '../../../store/categoriesSlice';
import HeaderNavigationLoader from '../Loaders/HeaderNavigationLoader';
import ToggleDarkMode from './ToggleDarkMode';
import {getProducts} from '../../../store/productsSlice';
import SpinnerLoader from '../Loaders/SpinnerLoader';

const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    const categories = useSelector(getCategories());
    const products = useSelector(getProducts());

    return (
        <>
            <Breadcrumbs />
            <div className='navbar bg-base-100 sticky top-0 z-50 border-b'>
                <div className='flex-1'>
                    <ToggleDarkMode />
                    <Link
                        to='products'
                        className='btn btn-ghost normal-case text-xl hover:text-red-500'
                    >
                        Каталог
                    </Link>
                </div>
                <NavBarSearchField />
                {isLoggedIn ? (
                    <>
                        <NavBarBasket />
                        <NavBarAvatar />
                    </>
                ) : (
                    <Link to='login' className='btn'>
                        Войти
                    </Link>
                )}
            </div>
            {categories ? (
                <HeaderNavigation categories={categories} />
            ) : (
                <HeaderNavigationLoader />
            )}

            {!categories && !products ? <SpinnerLoader /> : null}
        </>
    );
};

export default NavBar;
