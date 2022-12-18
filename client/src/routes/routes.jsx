import React from 'react';
import {Navigate} from 'react-router-dom';
import HomePage from '../components/pages/HomePage';
import ProductsListPage from '../components/pages/ProductsListPage';
import ProductsLayout from '../layouts/ProductsLayout';
import ProductPage from '../components/pages/ProductPage';
import Login from '../layouts/Login';
import RegisterForm from '../components/ui/RegisterForm';
import LogOut from '../layouts/LogOut';
import AdminPanel from '../layouts/AdminPanel';
import UsersList from '../components/ui/AdminPanel/UsersList';
import CategoriesList from '../components/ui/AdminPanel/CategoriesList';
import ProductsListAdmin from '../components/ui/AdminPanel/ProductsListAdmin';
import ProtectedRoute from '../components/common/ProtectedRoute';

const routes = () => [
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
        element: <ProtectedRoute element={<AdminPanel />} />,
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
        element: <ProductsListPage />,
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
            {path: '', element: <ProductsListPage />},
            {
                path: ':productId',
                element: <ProductPage />,
            },
            {path: '*', element: <Navigate to='' />},
        ],
    },
    {path: '*', element: <Navigate to='/' />},
];

export default routes;
