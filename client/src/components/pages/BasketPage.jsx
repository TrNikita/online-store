import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    addProductToBasket,
    getBasket,
    removeProductFromBasket,
} from '../../store/basketsSlice';
// eslint-disable-next-line no-unused-vars
import {totalPrice} from '../../utils/totalPrice';
import {getProducts} from '../../store/productsSlice';

const BasketPage = () => {
    const dispatch = useDispatch();

    const basket = useSelector(getBasket());
    const products = useSelector(getProducts());

    // eslint-disable-next-line no-unused-vars
    const handleClickAdd = async (product) => {
        const addedProductToBasket = {products: product};
        dispatch(addProductToBasket(addedProductToBasket));
    };
    // eslint-disable-next-line no-unused-vars
    const handleClickRemove = async (product) => {
        const removedProductFromBasket = {products: product};
        dispatch(removeProductFromBasket(removedProductFromBasket));
    };

    function findProduct(prodId) {
        return products?.find((p) => p._id === prodId);
    }

    function productsInBasketCount(p) {
        const productsInBasket = basket?.filter((b) => b === p);
        return productsInBasket.length;
    }

    if (!products || !basket) return 'Loading';

    const uniqueProdInBasket = [...new Set(basket)];

    console.log('totalPrice()', totalPrice({basket, products}));

    return (
        <>
            <div className='divider m-0'></div>
            <div className='flex justify-center'>
                <div className='overflow-x-auto w-4/5 align-middle'>
                    <table className='table w-full text-center'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Цена</th>
                                <th>в корзине</th>
                                <th>Всего</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {basket
                                ? uniqueProdInBasket.map((p) => (
                                      <tr key={p}>
                                          <td>
                                              <div className='flex items-center space-x-3'>
                                                  <div className='avatar'>
                                                      <div className='mask mask-squircle w-12 h-12'>
                                                          <img
                                                              src={
                                                                  findProduct(p)
                                                                      .imgUrl
                                                              }
                                                              alt='img'
                                                          />
                                                      </div>
                                                  </div>
                                                  <div>
                                                      <div className='font-bold break-normal whitespace-pre-wrap'>
                                                          {findProduct(p).name}
                                                      </div>
                                                  </div>
                                              </div>
                                          </td>
                                          <td>
                                              {findProduct(
                                                  p,
                                              ).price.toLocaleString()}{' '}
                                              ₽
                                          </td>
                                          <td>{productsInBasketCount(p)}</td>
                                          <td>
                                              {(
                                                  findProduct(p).price *
                                                  productsInBasketCount(p)
                                              ).toLocaleString()}{' '}
                                              ₽
                                          </td>
                                          <th>
                                              <button
                                                  className='btn btn-ghost btn-xs'
                                                  onClick={() =>
                                                      handleClickAdd(p)
                                                  }
                                              >
                                                  Добавить
                                              </button>
                                          </th>
                                          <th>
                                              <button
                                                  className='btn btn-ghost btn-xs'
                                                  onClick={() =>
                                                      handleClickRemove(p)
                                                  }
                                              >
                                                  Удалить
                                              </button>
                                          </th>
                                      </tr>
                                  ))
                                : null}
                            <tr>
                                <th></th>
                                <th></th>
                                <th>Итого</th>
                                <th>
                                    {totalPrice({
                                        basket,
                                        products,
                                    }).toLocaleString()}{' '}
                                    ₽
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default BasketPage;
