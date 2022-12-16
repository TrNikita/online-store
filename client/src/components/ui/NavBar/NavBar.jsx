import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {getIsLoggedIn} from '../../../store/usersSlice';
import NavBarAvatar from './NavBarAvatar';
import NavBarBasket from './NavBarBasket';
import NavBarSearchField from './NavBarSearchField';
import NavBarMenu from './NavBarMenu';
import Breadcrumbs from '../Breadcrumbs';
import HeaderNavigation from '../HeaderNavigation';
import {getCategories} from '../../../store/categoriesSlice';

const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    const categories = useSelector(getCategories());

    return (
        <>
            <Breadcrumbs />
            <div className='navbar bg-base-100 sticky top-0 z-50 border-b'>
                <NavBarMenu />
                <div className='flex-1'>
                    <Link
                        to='products'
                        className='btn btn-ghost normal-case text-xl'
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
            {categories ? <HeaderNavigation categories={categories} /> : null}
        </>
    );
};

export default NavBar;
