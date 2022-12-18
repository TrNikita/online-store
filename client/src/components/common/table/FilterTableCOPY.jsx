import React from 'react';
import PropTypes from 'prop-types';

const FilterTable123 = ({
    items,
    handleChange,
    contentProperty,
    valueProperty,
    filterKeys,
    checkedValueId,
}) => {
    return (
        <div>
            <h1 className='font-bold text-center'>{filterKeys.name}</h1>
            <div className='form-control'>
                {items.map((item) => (
                    <label
                        key={item[valueProperty]}
                        className='label cursor-pointer'
                    >
                        <span className='label-text text-xs px-3 hover:text-accent'>
                            {item[contentProperty]}
                        </span>
                        <input
                            type='checkbox'
                            onChange={() => handleChange(item[valueProperty])}
                            className='checkbox checkbox-sm'
                            checked={
                                checkedValueId
                                    ? checkedValueId === item._id
                                    : null
                            }
                            disabled={
                                checkedValueId
                                    ? checkedValueId !== item._id
                                    : null
                            }
                        />
                    </label>
                ))}
            </div>
        </div>
    );
};

FilterTable123.defaultProps = {
    valueProperty: '_id',
    contentProperty: 'name',
};

FilterTable123.propTypes = {
    items: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
    contentProperty: PropTypes.string.isRequired,
    valueProperty: PropTypes.string.isRequired,
    filterKeys: PropTypes.object,
    checkedValueId: PropTypes.string,
};

export default FilterTable123;
