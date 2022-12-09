import React from 'react';
import PropTypes from 'prop-types';

const CheckBoxField = ({name, value, onChange, children, error}) => {
    const handleChange = () => {
        onChange({name, value: !value});
    };
    const getInputClasses = () => {
        return 'checkbox align-middle' + (error ? ' checkbox-error' : '');
    };
    const getTextClasses = () => {
        return 'px-2 ' + (error ? 'text-red-500 text-sm italic' : 'label-text');
    };

    return (
        <div className='mx-4 my-1 py-2 '>
            <input
                className={getInputClasses()}
                type='checkbox'
                value=''
                id={name}
                onChange={handleChange}
                checked={value}
            />
            <label className={getTextClasses()} htmlFor={name}>
                {children}
            </label>
        </div>
    );
};
CheckBoxField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    error: PropTypes.string,
};

export default CheckBoxField;
