const users = [
    {
        _id: 1,
        name: 'Джон Дориан',
        email: 'Jony7351@tw.com',
        sex: 'male',
        tel: '88005553535',
    },
    {
        _id: 2,
        name: 'Брэд Питт',
        email: 'superstar@star.com',
        sex: 'male',
        tel: '88005553535',
    },
    {
        _id: 3,
        name: 'Джоуи Триббиани',
        email: 'joe@trib.com',
        sex: 'male',
        tel: '88005553535',
    },
    {
        _id: 4,
        name: 'Моника Геллер',
        email: 'mono@super.com',
        sex: 'female',
        tel: '88005553535',
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
