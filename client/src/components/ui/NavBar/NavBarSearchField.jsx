import React from 'react';

const NavBarSearchField = () => {
    return (
        <div className='form-control mx-1'>
            <input
                type='text'
                placeholder='Поиск'
                className='input input-bordered'
            />
        </div>
    );
};

export default NavBarSearchField;
