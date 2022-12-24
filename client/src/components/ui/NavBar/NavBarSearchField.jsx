import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {getProducts} from '../../../store/productsSlice';
import {Link, useNavigate} from 'react-router-dom';

const NavBarSearchField = () => {
    const products = useSelector(getProducts());
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchQuery = ({target}) => {
        return products ? setSearchQuery(target.value) : null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/products', {
            state: {
                value: searchProducts,
                key: searchQuery,
            },
        });
        setSearchQuery('');
    };

    const handleClick = (e) => {
        e.preventDefault();
        setSearchQuery('');
    };

    const searchProducts = products?.filter((p) => {
        return p.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;
    });

    return (
        <form onSubmit={handleSubmit} className='overflow-hidden'>
            <div className='form-control mx-1'>
                <input
                    type='text'
                    placeholder='Поиск'
                    className='input input-bordered'
                    onChange={handleSearchQuery}
                    value={searchQuery}
                />
                {searchQuery ? (
                    <ul className='menu bg-base-100 w-54 rounded-box absolute z-50 my-12 text-xs'>
                        {searchProducts[0] ? (
                            searchProducts.map((p) => (
                                <li
                                    key={p._id}
                                    className='hover-bordered border'
                                    onClick={handleClick}
                                >
                                    <Link to={`/products/${p._id}`}>
                                        {p.name}
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <li className='p-2 italic'>Ничего не найдено</li>
                        )}
                    </ul>
                ) : null}
            </div>
        </form>
    );
};

export default NavBarSearchField;
