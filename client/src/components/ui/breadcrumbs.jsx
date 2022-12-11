import React, {useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getProducts, loadProductsList} from '../../store/productsSlice';
// import {getCategory} from '../../store/categorySlice';

const Breadcrumbs = () => {
    const {pathname} = useLocation();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadProductsList());
    }, []);
    const products = useSelector(getProducts());
    // const category = useSelector(getCategory());

    const pathArr = pathname.split('/').slice(1);

    const namesOfPath = [
        {products: 'Продукты'},
        {edit: 'Редактирование'},
        {login: 'Войти'},
        {adminpanel: 'Панель администратора'},
        {users: 'Пользователи'},
        {categories: 'Категории'},
    ];

    const pathWithNames = pathArr.map((path) => {
        const findInNamesOfPath = namesOfPath.find(
            (name) => Object.keys(name).toString() === path,
        );
        if (findInNamesOfPath) {
            return findInNamesOfPath;
        } else {
            const findInProducts = products
                ? products.find((a) => a._id.toString() === path)
                : null;
            const objWithNames = {};
            objWithNames[findInProducts?._id] = findInProducts?.title;
            return objWithNames;
        }
    });

    const container = {};
    const pathForBreadcrumbs = pathWithNames.reduce((acc, curr) => {
        const path = Object.keys(acc).slice(-1) + '/' + Object.keys(curr);
        container[path] = Object.values(curr).toString();
        return container;
    }, []);

    return (
        <div className='text-sm breadcrumbs m-1 p-1'>
            <ul>
                <li>
                    <Link to='/'>Главная</Link>
                </li>
                {Object.entries(pathForBreadcrumbs).map((path) => (
                    <li key={path[0]}>
                        <Link to={path[0]}>{path[1]}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Breadcrumbs;
