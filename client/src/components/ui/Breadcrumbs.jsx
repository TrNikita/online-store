import React, {memo} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {getProducts} from '../../store/productsSlice';
import {getCategories} from '../../store/categoriesSlice';

const Breadcrumbs = memo(() => {
    const {pathname} = useLocation();
    const products = useSelector(getProducts());
    const categories = useSelector(getCategories());

    const pathArr = pathname.split('/').slice(1);

    const namesOfPath = [
        {products: 'Продукты'},
        {edit: 'Редактирование'},
        {login: 'Войти'},
        {adminpanel: 'Панель администратора'},
        {users: 'Пользователи'},
        {categories: 'Категории'},
        {basket: 'Корзина'},
    ];

    const pathWithNames = pathArr.map((path) => {
        // ищем в namesOfPath
        const findInNamesOfPath = namesOfPath.find(
            (name) => Object.keys(name).toString() === path,
        );
        if (findInNamesOfPath) return findInNamesOfPath;

        // ищем в продуктах
        const findInProducts = products
            ? products.find((p) => p._id.toString() === path)
            : null;
        const objWithProductNames = {};
        objWithProductNames[findInProducts?._id] = findInProducts?.name;
        if (Object.values(objWithProductNames)[0]) return objWithProductNames;

        // ищем в категориях
        const findInCategories = categories
            ? categories.find((c) => c.path.toString() === path)
            : null;
        const objWithCategoryNames = {};
        objWithCategoryNames[findInCategories?.path] = findInCategories?.name;
        return objWithCategoryNames;
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
});

export default Breadcrumbs;
