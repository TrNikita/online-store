import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {getProducts} from '../../store/productsSlice';
import {getCategories} from '../../store/categoriesSlice';
import ProductCard from '../ui/ProductCard';
import Pagination from '../common/table/Pagination';
import FilterTable from '../common/table/FilterTable';
import {paginate} from '../../utils/paginate';
import {extractUniqueValueByKey} from '../../utils/extractUniqueValueByKey';

const ProductsListPageCopy = () => {
    const params = useParams();

    const products = useSelector(getProducts());
    const categories = useSelector(getCategories());

    const categoryIdByParams = products
        ? categories.find((c) => c.path === params.categoryId)?._id
        : null;

    const categoriesKeys = {key: 'category', name: 'Категории'};
    const brandsKeys = {key: 'brand', name: 'Бренды'};
    const yearsKeys = {key: 'year', name: 'Год'};

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
    // поиск
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchQuery = ({target}) => {
        setSearchQuery(target.value);
    };

    // страницы
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    if (products && categories) {
        // фильтр по params
        const productsSortedByCategory = sortedByCategory(products);

        // по фильтру категории
        const selectedProductsByCategories =
            selectedCategory.length === 0
                ? productsSortedByCategory
                : products.filter((p) => selectedCategory.includes(p.category));

        // только бренды
        const brands = () => {
            const brandsFromProducts = selectedProductsByCategories.map(
                (p) => p.brand,
            );
            const uniqBrands = [...new Set(brandsFromProducts)]; // оставляем уникальные
            return uniqBrands.reduce((acc, curr) => {
                const obj = {};
                obj._id = curr;
                obj.name = curr;
                acc.push(obj);
                return acc;
            }, []); // приводим к формату {_id: 'Apple', name: 'Apple'}
        };

        // function extractUniqueValueByKey(items, key) {
        //     const valueFromItemsByKey = items.map((i) => i[key]);
        //     const uniqueValue = [...new Set(valueFromItemsByKey)]; // оставляем уникальные
        //     return uniqueValue.reduce((acc, curr) => {
        //         const obj = {};
        //         obj._id = curr;
        //         obj.name = curr;
        //         acc.push(obj);
        //         return acc;
        //     }, []); // приводим к формату {_id: 'Apple', name: 'Apple'}
        // }

        extractUniqueValueByKey(products, 'brand');
        console.log(
            'exctractUnique',
            extractUniqueValueByKey(products, 'brand'),
        );

        // добавляем фильтр по брендам
        const selectedProductsByCategoriesAndBrands =
            selectedBrand.length === 0
                ? selectedProductsByCategories
                : selectedProductsByCategories.filter((p) =>
                      selectedBrand.includes(p.brand),
                  );

        // только год
        const years = () => {
            const yearsFromProducts = selectedProductsByCategoriesAndBrands.map(
                (p) => p.year,
            );
            const uniqYears = [...new Set(yearsFromProducts)]; // оставляем уникальные
            return uniqYears.reduce((acc, curr) => {
                const obj = {};
                obj._id = curr;
                obj.name = curr;
                acc.push(obj);
                return acc;
            }, []); // приводим к формату {_id: 'Apple', name: 'Apple'}
        };

        // добавляем фильтр по годам
        const selectedProductsByCategoriesAndBrandsAndYears =
            selectedYear.length === 0
                ? selectedProductsByCategoriesAndBrands
                : selectedProductsByCategoriesAndBrands.filter((p) =>
                      selectedYear.includes(p.year),
                  );

        const searchProducts = searchQuery
            ? selectedProductsByCategoriesAndBrandsAndYears.filter(
                  (p) =>
                      p.name
                          .toLowerCase()
                          .indexOf(searchQuery.toLowerCase()) !== -1,
              )
            : selectedProductsByCategoriesAndBrandsAndYears;

        console.log('searchProducts', searchProducts);

        // todo доделать поиск

        const selectProductsCrop = paginate(
            selectedProductsByCategoriesAndBrandsAndYears,
            currentPage,
            pageSize,
        );

        // eslint-disable-next-line no-unused-vars
        const selectedFilter = [
            {year: ['2022', '2021']},
            {brand: ['Apple', 'Xiaomi']},
        ];

        const filter = selectedProductsByCategoriesAndBrands.filter(
            (product) => {
                return selectedFilter.every((filter) => {
                    // проходимся по каждому продукту столько раз, сколько ключей в фильтре, необходимо, чтобы каждый выдал true
                    return Object.values(filter)[0].includes(
                        // Object.values(filter) = например ['2022', '2021']; Object.keys(filter) = например 'year';
                        product[Object.keys(filter)],
                    );
                });
            },
        );

        console.log('filter', filter);

        console.log('categories', categories);
        console.log('brands()', brands());
        console.log('years()', years());

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
                            items={brands()}
                            handleChange={handleFilterChangeByBrand}
                        />
                        <FilterTable
                            filterKeys={yearsKeys}
                            items={years()}
                            handleChange={handleFilterChangeByYear}
                        />
                    </div>
                    <input
                        type='text'
                        name='searchQuery'
                        placeholder='Search...'
                        onChange={handleSearchQuery}
                        value={searchQuery}
                    />
                    <div>
                        <ProductCard
                            products={selectProductsCrop}
                            categories={categories}
                        />
                    </div>
                </div>
                <Pagination
                    itemsCount={
                        selectedProductsByCategoriesAndBrandsAndYears.length
                    }
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </>
        );
    }
};

export default ProductsListPageCopy;
