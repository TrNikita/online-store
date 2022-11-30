import React from 'react';
import {Link, useLocation} from 'react-router-dom';

const Breadcrumbs = () => {
    const {pathname} = useLocation();
    console.log('path', pathname);
    const pathArr = pathname.split('/').slice(1);
    console.log('asd', pathArr);
    return (
        <div className='text-sm breadcrumbs m-1 p-1'>
            <ul>
                <li>
                    <Link to='/'>Главная</Link>
                </li>
                {pathArr.map((path) => (
                    <li key={path}>
                        <Link to={path}>{path}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Breadcrumbs;
