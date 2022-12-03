// 1. У любого пользователя будет как минимум в БД qualities & professions
// 2. Они равны mock данным

const Brand = require('../models/Brand');
const brandMock = require('../mock/brands.json');

module.exports = async () => {
    const brands = await Brand.find();
    if (brands.length !== brandMock.length)
        await createInitialEntity(Brand, brandMock);
};

async function createInitialEntity(Model, data) {
    await Model.collection.drop();
    return Promise.all(
        data.map(async (item) => {
            try {
                delete item._id;
                const newItem = new Model(item);
                await newItem.save();
                return newItem;
            } catch (e) {
                return e;
            }
        }),
    );
}
