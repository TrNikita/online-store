import React from 'react';
import PropTypes from 'prop-types';

const SearchTable = ({searchQuery, handleClearSearchQuery}) => {
    return (
        <div className='alert shadow-lg m-2 px-4 py-1 border justify-start'>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
            >
                <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
            </svg>
            Поиск по:
            <div className='font-bold text-xl'>{searchQuery?.key}</div>
            {!searchQuery?.value[0] ? (
                <div className='italic text-red-500'>ничего не найдено</div>
            ) : (
                <div className='italic'>
                    (найдено {searchQuery.value.length} позиции)
                </div>
            )}
            <button className='btn' onClick={handleClearSearchQuery}>
                Очистить
            </button>
        </div>
    );
};

SearchTable.propTypes = {
    searchQuery: PropTypes.object.isRequired,
    handleClearSearchQuery: PropTypes.func,
};

export default SearchTable;
