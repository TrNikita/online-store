import React from 'react';
import {useSelector} from 'react-redux';
import {getCurrentUserData} from '../../store/usersSlice';
import PropTypes from 'prop-types';

const ProtectedRoute = ({element}) => {
    const user = useSelector(getCurrentUserData());

    if (user?.role === 'USER')
        return (
            <h1 className='text-red-500 text-xl p-4 font-mono'>
                Access denied
            </h1>
        );

    if (user?.role !== 'ADMIN')
        return (
            <h1 className='text-xl p-4 font-mono'>
                Checking authentication...
            </h1>
        );

    return element;
};

ProtectedRoute.propTypes = {
    element: PropTypes.object,
};

export default ProtectedRoute;
