import React from 'react';
import PropTypes from 'prop-types';

const ChangeTableForm = ({data, objectValue, dataValue, handleChange}) => {
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
    objectValue: PropTypes.string.isRequired,
    dataValue: PropTypes.string.isRequired,
    data: PropTypes.any,
    handleChange: PropTypes.func.isRequired,
};

export default ChangeTableForm;
