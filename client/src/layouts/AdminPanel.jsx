import React from 'react';
import {Link, Outlet, useLocation} from 'react-router-dom';

const AdminPanel = () => {
    const links = [
        {
            link: 'users',
            title: 'Пользователи',
        },
        {
            link: 'categories',
            title: 'Категории',
        },
        {
            link: 'products',
            title: 'Продукты',
        },
    ];

    const getClasses = (link) => {
        const {pathname} = useLocation();
        const activeLink = pathname.split('/');
        if (activeLink[activeLink.length - 1] === link) return 'tab tab-active';
        else return 'tab';
    };

    return (
        <>
            <div className='tabs'>
                {links.map((item) => (
                    <Link
                        to={item.link}
                        className={getClasses(item.link)}
                        key={item.link}
                    >
                        {item.title}
                    </Link>
                ))}
            </div>
            <Outlet />
        </>
    );
};

export default AdminPanel;
