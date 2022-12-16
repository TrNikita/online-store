import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const HeaderNavigation = ({categories}) => {
    // console.log('category', category);

    return (
        <footer className='bg-neutral-content/25 flex flex-row justify-around px-24 py-1.5 shadow font-bold italic'>
            {categories ? (
                <>
                    {categories.map((c) => (
                        <Link
                            to={c.path}
                            className='link link-hover hover:transition ease-in-out delay-50 hover:scale-105 hover:duration-300 hover:text-accent'
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
