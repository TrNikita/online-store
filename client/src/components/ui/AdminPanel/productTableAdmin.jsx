import React, {useState} from 'react';
import PropTypes from 'prop-types';
// import {useDispatch} from 'react-redux';
import ChangeTableForm from '../../common/form/changeTableForm';
import {dateAfterPost} from '../../../utils/dateAfterPost';

const ProductTableAdmin = ({product, index}) => {
    // const dispatch = useDispatch();

    const [data, setData] = useState(product);

    const handleChange = ({target}) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    const handleDeleteProduct = (user) => {
        console.log('user', user);
    };
    const handleUpdateProduct = () => {
        console.log('data', data);
    };

    return (
        <>
            <th>{index + 1}</th>
            <td></td>
            <ChangeTableForm
                data={data}
                dataValue={data.name}
                objectValue={product.name}
                handleChange={handleChange}
            />
            <ChangeTableForm
                data={data}
                dataValue={data.category}
                objectValue={product.category}
                handleChange={handleChange}
            />
            <ChangeTableForm
                data={data}
                dataValue={data.brand}
                objectValue={product.brand}
                handleChange={handleChange}
            />
            <ChangeTableForm
                data={data}
                dataValue={data.year}
                objectValue={product.year}
                handleChange={handleChange}
            />
            <ChangeTableForm
                data={data}
                dataValue={data.prevPrice}
                objectValue={product.prevPrice}
                handleChange={handleChange}
            />
            <ChangeTableForm
                data={data}
                dataValue={data.price}
                objectValue={product.price}
                handleChange={handleChange}
            />
            <ChangeTableForm
                data={data}
                dataValue={data.tags}
                objectValue={product.tags}
                handleChange={handleChange}
            />
            <ChangeTableForm
                data={data}
                dataValue={data.description}
                objectValue={product.description}
                handleChange={handleChange}
            />
            <td>{dateAfterPost(product.createdAt)}</td>
            <td>{dateAfterPost(product.updatedAt)}</td>
            <td>
                <button
                    className='btn btn-ghost btn-xs'
                    onClick={() => handleUpdateProduct(product)}
                >
                    Обновить
                </button>
            </td>
            <td>
                <button
                    className='btn btn-ghost btn-xs'
                    onClick={() => handleDeleteProduct(product)}
                >
                    Удалить
                </button>
            </td>
        </>
    );
};

ProductTableAdmin.propTypes = {
    product: PropTypes.object,
    index: PropTypes.number,
};

export default ProductTableAdmin;
