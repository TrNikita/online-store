import React from 'react';
import PropTypes from 'prop-types';

const TextFieldAdminPanel = ({
    data,
    objectValue,
    dataValue,
    options,
    handleChange,
}) => {
    const index = Object.values(data).findIndex((i) => i === dataValue);
    const name = Object.keys(data)[index];

    const optionsArray =
        !Array.isArray(options) && typeof options === 'object'
            ? Object.values(options)
            : options;

    return (
        <td>
            <select
                className='select w-full max-w-xs'
                id={name}
                name={name}
                value={dataValue || objectValue}
                onChange={handleChange}
            >
                <option disabled value=''>
                    Выберите категорию
                </option>
                <option>Нет категории</option>
                {optionsArray.map((o) => (
                    <option key={o._id} value={o._id}>
                        {o.name}
                    </option>
                ))}
            </select>
        </td>
    );
};

TextFieldAdminPanel.propTypes = {
    data: PropTypes.any,
    objectValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dataValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    handleChange: PropTypes.func,
};

export default TextFieldAdminPanel;
