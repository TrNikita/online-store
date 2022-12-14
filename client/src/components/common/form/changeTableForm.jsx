import React from 'react';
import PropTypes from 'prop-types';

const ChangeTableForm = ({data, objectValue, dataValue, handleChange}) => {
    console.log('objectValue', objectValue);
    const index = Object.values(data).findIndex((i) => i === dataValue);
    const name = Object.keys(data)[index];

    return (
        <td>
            <input
                type='text'
                className='input w-full max-w-xs'
                value={dataValue || objectValue}
                name={name}
                onChange={handleChange}
            />
        </td>
    );
};

ChangeTableForm.propTypes = {
    objectValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dataValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    data: PropTypes.any,
    handleChange: PropTypes.func.isRequired,
};

export default ChangeTableForm;
