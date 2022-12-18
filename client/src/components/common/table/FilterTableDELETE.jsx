import React from 'react';
import PropTypes from 'prop-types';
import {extractUniqueValueByKey} from '../../../utils/extractUniqueValueByKey';

const FilterTableDELETE = ({
    items,
    filterKeys,
    handleChange,
    valueProperty,
    checkedValue,
}) => {
    const valuesToFilter = extractUniqueValueByKey(items, filterKeys.key);
    return (
        <div>
            <h1 className='font-bold text-center'>{filterKeys.name}</h1>
            <div className='form-control'>
                {valuesToFilter.map((item) => (
                    <label
                        key={item[valueProperty]}
                        className='label cursor-pointer'
                    >
                        <span className='label-text text-xs px-3 hover:text-accent'>
                            {item[valueProperty]}
                        </span>
                        <input
                            type='checkbox'
                            onChange={() =>
                                handleChange(
                                    item[valueProperty],
                                    filterKeys.key,
                                )
                            }
                            className='checkbox checkbox-sm'
                            checked={
                                checkedValue
                                    ? checkedValue === item._id
                                    : null
                            }
                            disabled={
                                checkedValue
                                    ? checkedValue !== item._id
                                    : null
                            }
                        />
                    </label>
                ))}
            </div>
        </div>
    );
};

FilterTableDELETE.defaultProps = {
    valueProperty: '_id',
};

FilterTableDELETE.propTypes = {
    items: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
    filterKeys: PropTypes.object,
    valueProperty: PropTypes.string.isRequired,
    checkedValue: PropTypes.string,
};

export default FilterTableDELETE;
