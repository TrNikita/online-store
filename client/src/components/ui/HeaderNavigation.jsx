import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const HeaderNavigation = ({category}) => {
    // console.log('category', category);

    return (
        <footer className='bg-neutral-content/25 text-neutral flex flex-row justify-between px-24 shadow'>
            {category ? (
                <>
                    {category.map((c) => (
                        <Link
                            to={c.path}
                            className='link link-hover'
                            key={c._id}
                        >
                            {c.name}
                        </Link>
                    ))}
                </>
            ) : (
                <span className='link link-hover'></span>
            )}
        </footer>
    );
};

HeaderNavigation.propTypes = {
    category: PropTypes.array,
};

export default HeaderNavigation;
