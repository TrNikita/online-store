const users = [
    {
        _id: 1,
        name: 'Джон Дориан',
        email: 'Jony7351@tw.com',
        role: 'ADMIN',
    },
    {
        _id: 2,
        name: 'Брэд Питт',
        email: 'superstar@star.com',
        role: 'USER',
    },
    {
        _id: 3,
        name: 'Джоуи Триббиани',
        email: 'joe@trib.com',
        role: 'USER',
    },
    {
        _id: 4,
        name: 'Моника Геллер',
        email: 'mono@super.com',
        role: 'USER',
    },
];

const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function() {
            resolve(users);
        }, 300);
    });

const getById = (id) =>
    new Promise((resolve) => {
        window.setTimeout(function() {
            resolve(users.find((user) => user._id === id));
        }, 5000);
    });
export default {
    fetchAll,
    getById,
};
