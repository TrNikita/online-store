const brands = [
    {
        _id: '1',
        brand: 'Apple',
    },
    {
        _id: '2',
        brand: 'Samsung',
    },
    {
        _id: '3',
        brand: 'Huawei',
    },
];
const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function() {
            resolve(brands);
        }, 300);
    });

export default {
    fetchAll,
};
