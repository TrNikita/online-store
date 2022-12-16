import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = ({itemsCount, pageSize, currentPage, onPageChange}) => {
    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);

    return (
        <div className='btn-group flex justify-center p-1'>
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={
                        'btn' + (page === currentPage ? ' btn-active' : '')
                    }
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
