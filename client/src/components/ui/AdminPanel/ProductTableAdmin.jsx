import React, {useState} from 'react';
import PropTypes from 'prop-types';
import TextFieldAdminPanel from '../../common/form/TextFieldAdminPanel';
import {dateAfterPost} from '../../../utils/dateAfterPost';
import SelectFieldAdminPanel from '../../common/form/SelectFieldAdminPanel';
import {useDispatch} from 'react-redux';
import {removeProduct, updateProduct} from '../../../store/productsSlice';

const ProductTableAdmin = ({product, index, categories}) => {
    const dispatch = useDispatch();
    const [data, setData] = useState(product);

    const handleChange = ({target}) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    const handleDeleteProduct = (product) => {
        dispatch(removeProduct(product._id));
    };
    const handleUpdateProduct = () => {
        dispatch(updateProduct(data));
    };

    return (
        <>
            <th>{index + 1}</th>
            <td>
                <div className='mask mask-squircle w-12 h-12'>
                    <img src={product.imgUrl} alt='img' />
                </div>
            </td>
            <TextFieldAdminPanel
                data={data}
                dataValue={data.imgUrl}
                objectValue={product.imgUrl}
                handleChange={handleChange}
            />
            <TextFieldAdminPanel
                data={data}
                dataValue={data.name}
                objectValue={product.name}
                handleChange={handleChange}
            />
            <SelectFieldAdminPanel
                handleChange={handleChange}
                dataValue={data.category}
                objectValue={product.category}
                data={data}
                options={categories}
            />
            <TextFieldAdminPanel
                data={data}
                dataValue={data.brand}
                objectValue={product.brand}
                handleChange={handleChange}
            />
            <TextFieldAdminPanel
                data={data}
                dataValue={data.year}
                objectValue={product.year}
                handleChange={handleChange}
            />
            <TextFieldAdminPanel
                data={data}
                dataValue={data.prevPrice}
                objectValue={product.prevPrice}
                handleChange={handleChange}
            />
            <TextFieldAdminPanel
                data={data}
                dataValue={data.price}
                objectValue={product.price}
                handleChange={handleChange}
            />
            <TextFieldAdminPanel
                data={data}
                dataValue={data.tags}
                objectValue={product.tags}
                handleChange={handleChange}
            />
            <TextFieldAdminPanel
                data={data}
                dataValue={data.description}
                objectValue={product.description}
                handleChange={handleChange}
            />
            <td className='text-xs'>{dateAfterPost(product.createdAt)}</td>
            <td className='text-xs'>{dateAfterPost(product.updatedAt)}</td>
            <td>
                <button
                    className='btn btn-xs'
                    onClick={() => handleUpdateProduct(product)}
                >
                    ????????????????
                </button>
            </td>
            <td>
                <button
                    className='btn btn-xs'
                    onClick={() => handleDeleteProduct(product)}
                >
                    ??????????????
                </button>
            </td>
        </>
    );
};

ProductTableAdmin.propTypes = {
    product: PropTypes.object,
    categories: PropTypes.array,
    index: PropTypes.number,
};

export default ProductTableAdmin;
