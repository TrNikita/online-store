import React from 'react';
import {Link, Outlet} from 'react-router-dom';

const HomePage = () => {
    return (
        <>
            <div className='m-3 p-5 border-2 border-cyan-300'>Home page</div>
            <div>
                <Link to='/products' className='link link-warning'>
                    Products
                </Link>
            </div>
            <Outlet />
        </>
    );
};

export default HomePage;
