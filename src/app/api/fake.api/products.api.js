const products = [
    {
        _id: 1,
        title: 'Iphone 13',
        brand: 'Apple',
        category: 'telephone',
        year: 2022,
        prevPrice: '',
        price: 999,
        rate: 5,
        isFavourite: false,
        tags: 'New',
        promotion: '',
        description: '',
        configuration: [],
    },
    {
        _id: 2,
        title: 'Galaxy note',
        brand: 'Samsung',
        category: 'telephone',
        year: 2021,
        prevPrice: '',
        price: 999,
        rate: 5,
        isFavourite: false,
        tags: '',
        promotion: '',
        description: '',
        configuration: [],
    },
    {
        _id: 3,
        title: 'macbook',
        brand: 'Apple',
        category: 'notebook',
        year: 2020,
        prevPrice: 1500,
        price: 999,
        rate: 5,
        isFavourite: false,
        tags: '',
        promotion: '',
        description: '',
        configuration: [],
    },
    {
        _id: 4,
        title: 'matebook',
        brand: 'Huawei',
        category: 'notebook',
        year: 2019,
        prevPrice: 1230,
        price: 999,
        rate: 5,
        isFavourite: false,
        tags: '',
        promotion: '',
        description: '',
        configuration: [],
    },
];

const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function() {
            resolve(products);
        }, 300);
    });

export default {
    fetchAll,
};
