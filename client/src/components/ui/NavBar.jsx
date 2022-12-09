import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
    getIsLoggedIn,
    getUsersList,
    loadUsersList,
} from '../../store/usersSlice';
// import Avatar from './NavBar/Avatar';
// import LoginButton from './NavBar/LoginButton';
// import Basket from './NavBar/Basket';
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

    const users = useSelector(getUsersList());
    const category = useSelector(getCategory());
    const isLoggedIn = useSelector(getIsLoggedIn());

    console.log('isLoggedIn', isLoggedIn);
    console.log('users', users);
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
                {/* {user ? ( */}
                {/*     <> */}
                {/*         <Basket /> */}
                {/*         <Avatar /> */}
                {/*     </> */}
                {/* ) : ( */}
                <Link to='login' className='btn'>
                    Войти
                </Link>
                {/* // )} */}
            </div>
            <HeaderNavigation category={category} />
        </>
    );
};

export default Navbar;
