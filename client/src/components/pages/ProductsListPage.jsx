import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {getProducts} from '../../store/productsSlice';
import {getCategories} from '../../store/categoriesSlice';
import ProductCard from '../ui/ProductCard';
import Pagination from '../common/table/Pagination';
import FilterTable from '../common/table/FilterTable';
import {paginate} from '../../utils/paginate';

const ProductsListPage = () => {
    const params = useParams();

    const products = useSelector(getProducts());
    const categories = useSelector(getCategories());

    const categoryIdByParams = products
        ? categories.find((c) => c.path === params.categoryId)?.name
        : null;

    // проверка по params
    function sortedByCategory(products) {
        if (params.categoryId) {
            const categoryId = categories.find(
                (c) => c.path === params.categoryId,
            )?._id;

            return categoryId
                ? products.filter((p) => p.category === categoryId)
                : products;
        }
        return products;
    }

    const categoriesKeys = {key: 'category', name: 'Категории'};
    const brandsKeys = {key: 'brand', name: 'Бренды'};
    const yearsKeys = {key: 'year', name: 'Год'};

    const [selectedProduct, setSelectedProduct] = useState([]);

    const handleFilterChange = (item, key) => {
        const selectedKey = {};
        selectedKey[key] = [item];

        const index = selectedProduct.findIndex((p) => {
            return Object.keys(p).toString() === key;
        });

        if (index === -1)
            return setSelectedProduct((prevState) => [
                ...prevState,
                selectedKey,
            ]);

        if (index > -1) {
            const arrayOfValues = Object.values(selectedProduct[index])[0];

            if (!arrayOfValues.includes(item)) {
                console.log('a');
                arrayOfValues.push(item);
                selectedKey[key] = arrayOfValues;
                const newSelectedProduct = selectedProduct.slice();
                newSelectedProduct[index] = selectedKey;
                return setSelectedProduct(newSelectedProduct);
            }
            if (arrayOfValues.includes(item)) {
                selectedKey[key] = arrayOfValues.filter((i) => i !== item);
                if (Object.values(selectedKey).toString()) {
                    console.log('b');
                    const newSelectedProduct = selectedProduct.slice();
                    newSelectedProduct[index] = selectedKey;
                    console.log('newSelectedProduct', newSelectedProduct);
                    return setSelectedProduct(newSelectedProduct);
                } else if (!Object.values(selectedKey).toString()) {
                    console.log('c');
                    const newSelectedProduct = selectedProduct.slice();
                    console.log('newSelectedProduct', newSelectedProduct);
                    console.log(
                        'newSelectedProduct[index]',
                        newSelectedProduct[index],
                    );
                }
            }
        }
    };

    // // поиск
    // const [searchQuery, setSearchQuery] = useState('');
    // const handleSearchQuery = ({target}) => {
    //     setSearchQuery(target.value);
    // };

    // страницы
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    if (products && categories) {
        // фильтр по params
        const productsSortedByCategory = sortedByCategory(products);

        const productsWithCategoriesNames = productsSortedByCategory.map(
            (p) => {
                const category = categories.find((c) => c._id === p.category);
                return {...p, category: category.name};
            },
        );

        const filteredProducts = productsWithCategoriesNames.filter(
            (product) => {
                return selectedProduct.every((filter) => {
                    // проходимся по каждому продукту столько раз, сколько ключей в фильтре, необходимо, чтобы каждый выдал true
                    return Object.values(filter)[0].includes(
                        // Object.values(filter) = например ['2022', '2021']; Object.keys(filter) = например 'year';
                        product[Object.keys(filter)],
                    );
                });
            },
        );

        const selectProductsCrop = paginate(
            filteredProducts,
            currentPage,
            pageSize,
        );
        console.log('filter', filteredProducts);

        return (
            <>
                <div className='flex'>
                    <div className='w-1/5 border'>
                        <FilterTable
                            items={productsWithCategoriesNames}
                            filterKeys={categoriesKeys}
                            handleChange={handleFilterChange}
                            checkedValue={categoryIdByParams}
                        />
                        <FilterTable
                            filterKeys={brandsKeys}
                            items={productsWithCategoriesNames}
                            handleChange={handleFilterChange}
                        />
                        <FilterTable
                            filterKeys={yearsKeys}
                            items={productsWithCategoriesNames}
                            handleChange={handleFilterChange}
                        />
                    </div>
                    <div>
                        <ProductCard
                            products={selectProductsCrop}
                            categories={categories}
                        />
                    </div>
                </div>
                <Pagination
                    itemsCount={filteredProducts.length}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </>
        );
    }
};

export default ProductsListPage;
