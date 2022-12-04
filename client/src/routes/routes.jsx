import React from 'react';
import {Navigate} from 'react-router-dom';
import HomePage from '../components/pages/HomePage';
import ProductsList from '../components/pages/ProductsList';
import ProductsLayout from '../layouts/productsLayout';
import ProductPage from '../components/pages/ProductPage';
import ProductEditPage from '../components/pages/ProductEditPage';

const routes = [
    {
        path: '',
        element: <HomePage />,
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
