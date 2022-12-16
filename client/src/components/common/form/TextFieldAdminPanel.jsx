import React from 'react';
import PropTypes from 'prop-types';

const TextFieldAdminPanel = ({data, objectValue, dataValue, handleChange}) => {
    const index = Object.values(data).findIndex((i) => i === dataValue);
    const name = Object.keys(data)[index];
    const type = typeof objectValue;
    const value =
        dataValue === null && objectValue === null
            ? ''
            : dataValue || objectValue;

    return (
        <td>
            <input
                type={type === 'string' ? 'text' : 'number'}
                className='input w-full max-w-xs'
                value={value}
                name={name}
                onChange={handleChange}
            />
        </td>
    );
};

TextFieldAdminPanel.propTypes = {
    objectValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dataValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    data: PropTypes.any,
    handleChange: PropTypes.func.isRequired,
};

export default TextFieldAdminPanel;
