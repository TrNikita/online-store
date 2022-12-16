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
        ? categories.find((c) => c.path === params.categoryId)?._id
        : null;

    const categoriesName = 'Категории';
    const brandsName = 'Бренды';
    const yearsName = 'Год';

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

    // сортировка
    const [sortBy, setSortBy] = useState({order: 'asc'});
    const handleSort = (item) => {
        return setSortBy((prevState) => {
            return prevState.order === 'asc'
                ? {
                      path: item,
                      order: 'desc',
                  }
                : {
                      path: item,
                      order: 'asc',
                  };
        });
    };
    console.log('sortBy', sortBy);

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

        const selectProductsCrop = paginate(
            selectedProductsByCategoriesAndBrandsAndYears,
            currentPage,
            pageSize,
        );

        // console.log(
        //     'selectedProductsByCategoriesAndBrandsAndYears',
        //     selectedProductsByCategoriesAndBrandsAndYears,
        // );

        // const sorted = selectedProductsByCategoriesAndBrandsAndYears.slice();

        // sorted.sort((a, b) =>
        //     sortBy.order === 'asc'
        //         ? a[sortBy.path] - b[sortBy.path]
        //         : b[sortBy.path] - a[sortBy.path],
        // );
        // sorted.sort(
        //     (a, b) => b[sortBy].path[0].toLowerCase() - a.name[0].toLowerCase(),
        // );
        //
        // console.log('sorted', sorted);

        return (
            <>
                <div className='flex'>
                    <div className='w-1/5 border'>
                        <FilterTable
                            items={categories}
                            filterName={categoriesName}
                            handleChange={handleFilterChangeByCategory}
                            checkedValueId={categoryIdByParams}
                        />
                        <FilterTable
                            items={brands()}
                            filterName={brandsName}
                            handleChange={handleFilterChangeByBrand}
                        />
                        <FilterTable
                            items={years()}
                            filterName={yearsName}
                            handleChange={handleFilterChangeByYear}
                        />
                    </div>
                    <button className='btn' onClick={() => handleSort('price')}>
                        Price
                    </button>
                    <button className='btn' onClick={() => handleSort('name')}>
                        Name
                    </button>
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

export default ProductsListPage;
