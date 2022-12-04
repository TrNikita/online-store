const category = [
    {
        _id: '1',
        name: 'Телефоны',
        path: 'telephone',
    },
    {
        _id: '2',
        name: 'Ноутбуки',
        path: 'notebook',
    },
    {
        _id: '3',
        name: 'Аудиотехника',
        path: 'audio',
    },
    {
        _id: '4',
        name: 'Кухня',
        path: 'kitchen',
    },
    {
        _id: '5',
        name: 'Красота',
        path: 'beauty',
    },
    {
        _id: '6',
        name: 'Игры',
        path: 'game',
    },
];
const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function() {
            resolve(category);
        }, 300);
    });

export default {
    fetchAll,
};
