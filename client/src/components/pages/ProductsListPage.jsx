import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {useSelector} from 'react-redux';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {getProducts} from '../../store/productsSlice';
import {getCategories} from '../../store/categoriesSlice';
import ProductCard from '../ui/ProductCard';
import Pagination from '../common/table/Pagination';
import FilterTable from '../common/table/FilterTable';
import {paginate} from '../../utils/paginate';
import {extractUniqueValueByKey} from '../../utils/extractUniqueValueByKey';
import SearchTable from '../common/table/SearchTable';

const ProductsListPage = () => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const products = useSelector(getProducts());
    const categories = useSelector(getCategories());

    // поиск
    const [searchQuery, setSearchQuery] = useState(location?.state);

    useEffect(() => {
        setSearchQuery(location?.state);
    }, [location.state]);

    const handleClearSearchQuery = () => {
        navigate('/products');
    };

    const categoriesKeys = {key: 'category', name: 'Категории'};
    const brandsKeys = {key: 'brand', name: 'Бренды'};
    const yearsKeys = {key: 'year', name: 'Год'};

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

    // фильтр по категориям
    const [selectedCategory, setSelectedCategory] = useState([]);
    const handleFilterChangeByCategory = (item) => {
        setSelectedCategory((prevState) => {
            const findIndexInItems = prevState.findIndex((i) => i === item);
            return findIndexInItems !== -1
                ? prevState.filter((i) => i !== item)
                : [...prevState, item];
        });
    };

    // фильтр по брендам
    const [selectedBrand, setSelectedBrand] = useState([]);
    const handleFilterChangeByBrand = (item) => {
        setSelectedBrand((prevState) => {
            const findIndexInItems = prevState.findIndex((i) => i === item);
            return findIndexInItems !== -1
                ? prevState.filter((i) => i !== item)
                : [...prevState, item];
        });
    };

    // фильтр по годам
    const [selectedYear, setSelectedYear] = useState([]);
    const handleFilterChangeByYear = (item) => {
        setSelectedYear((prevState) => {
            const findIndexInItems = prevState.findIndex((i) => i === item);
            return findIndexInItems !== -1
                ? prevState.filter((i) => i !== item)
                : [...prevState, item];
        });
    };

    // страницы
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    if (products && categories) {
        // проверка по params
        const categoryIdByParams = products
            ? categories.find((c) => c.path === params.categoryId)?._id
            : null;

        // фильтр по поиску
        const searchProducts = searchQuery?.value[0]
            ? searchQuery.value
            : products;

        // фильтр по params
        const productsSortedByCategory = sortedByCategory(searchProducts);

        // по фильтру категории
        const selectedProductsByCategories =
            selectedCategory.length === 0
                ? productsSortedByCategory
                : productsSortedByCategory.filter((p) =>
                      selectedCategory.includes(p.category),
                  );

        // только бренды
        const brands = extractUniqueValueByKey(
            selectedProductsByCategories,
            'brand',
        );

        // добавляем фильтр по брендам
        const selectedProductsByCategoriesAndBrands =
            selectedBrand.length === 0
                ? selectedProductsByCategories
                : selectedProductsByCategories.filter((p) =>
                      selectedBrand.includes(p.brand),
                  );

        // только год
        const years = extractUniqueValueByKey(
            selectedProductsByCategoriesAndBrands,
            'year',
        );

        // добавляем фильтр по годам
        const selectedProductsByCategoriesAndBrandsAndYears =
            selectedYear.length === 0
                ? selectedProductsByCategoriesAndBrands
                : selectedProductsByCategoriesAndBrands.filter((p) =>
                      selectedYear.includes(p.year),
                  );

        const selectProductsCrop = paginate(
            selectedProductsByCategoriesAndBrandsAndYears,
            currentPage,
            pageSize,
        );

        const itemsCount =
            selectedProductsByCategoriesAndBrandsAndYears?.length;

        return (
            <>
                <div className='flex'>
                    <div className='w-1/5 border'>
                        <FilterTable
                            items={categories}
                            filterKeys={categoriesKeys}
                            handleChange={handleFilterChangeByCategory}
                            checkedValueId={categoryIdByParams}
                        />
                        <FilterTable
                            filterKeys={brandsKeys}
                            items={brands}
                            handleChange={handleFilterChangeByBrand}
                        />
                        <FilterTable
                            filterKeys={yearsKeys}
                            items={years}
                            handleChange={handleFilterChangeByYear}
                        />
                    </div>
                    <div className='flex-col'>
                        {searchQuery?.key ? (
                            <SearchTable
                                searchQuery={searchQuery}
                                handleClearSearchQuery={handleClearSearchQuery}
                            />
                        ) : null}

                        <div>
                            <ProductCard
                                products={selectProductsCrop}
                                categories={categories}
                            />
                        </div>
                    </div>
                </div>
                <Pagination
                    itemsCount={itemsCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </>
        );
    }
};

ProductsListPage.propTypes = {
    productsFromSearch: PropTypes.array,
};

export default ProductsListPage;
