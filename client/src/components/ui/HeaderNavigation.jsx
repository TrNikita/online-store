import React from 'react';
import PropTypes from 'prop-types';
import {Link, useLocation} from 'react-router-dom';

const HeaderNavigation = ({categories}) => {
    const getClasses = (link) => {
        const {pathname} = useLocation();
        const activeLink = pathname.split('/');
        if (activeLink[activeLink.length - 1] === link)
            return ' text-accent text-xl';
        return '';
    };

    return (
        <footer className='flex flex-nowrap justify-evenly bg-neutral-content/25 py-2 font-bold italic'>
            {categories ? (
                <>
                    {categories.map((c) => (
                        <Link
                            to={c.path}
                            className={
                                'link link-hover hover:transition ease-in-out delay-50 hover:scale-105 hover:duration-300 hover:text-accent p-1' +
                                getClasses(c.path)
                            }
                            key={c._id}
                        >
                            {c.name}{' '}
                        </Link>
                    ))}
                </>
            ) : (
                <span className='link link-hover'> </span>
            )}
        </footer>
    );
};

HeaderNavigation.propTypes = {
    categories: PropTypes.array,
};

export default HeaderNavigation;
