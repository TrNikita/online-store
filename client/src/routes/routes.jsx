import React from 'react';
import {Navigate} from 'react-router-dom';
import HomePage from '../components/pages/homePage';
import ProductsList from '../components/pages/productsList';
import ProductsLayout from '../layouts/productsLayout';
import ProductPage from '../components/pages/productPage';
import ProductEditPage from '../components/pages/productEditPage';
import Login from '../layouts/login';
import RegisterForm from '../components/ui/registerForm';
import LogOut from '../layouts/logOut';
import AdminPanel from '../layouts/adminPanel';
import UsersList from '../components/ui/AdminPanel/usersList';
import CategoriesList from '../components/ui/AdminPanel/categoriesList';
import ProductsListAdmin from '../components/ui/AdminPanel/productsListAdmin';

const routes = [
    {
        path: '',
        element: <HomePage />,
    },
    {
        path: 'login',
        element: <Login />,
        children: [
            {
                path: ':admin',
                element: <RegisterForm />,
            },
        ],
    },
    {
        path: 'AdminPanel',
        element: <AdminPanel />,
        children: [
            {
                path: '',
                element: <UsersList />,
            },
            {
                path: 'users',
                element: <UsersList />,
            },
            {
                path: 'categories',
                element: <CategoriesList />,
            },
            {
                path: 'products',
                element: <ProductsListAdmin />,
            },
        ],
    },
    {
        path: 'logout',
        element: <LogOut />,
        children: [
            {
                path: '',
                element: <Navigate to='/' />,
            },
        ],
    },
    {
        path: ':categoryId',
        element: <ProductsList />,
        children: [
            {
                path: '*',
                element: <Navigate to='products/:productId' />,
            },
        ],
    },
    {
        path: 'products',
        element: <ProductsLayout />,
        children: [
            {path: '', element: <ProductsList />},
            {
                path: ':productId',
                children: [
                    {path: '', element: <ProductPage />},
                    {path: 'edit', element: <ProductEditPage />},
                ],
            },
            {path: '*', element: <Navigate to='' />},
        ],
    },
    {path: '*', element: <Navigate to='/' />},
];

export default routes;
