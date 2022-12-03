const {Schema, model} = require('mongoose');

const schema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        brand: {
            // todo return to Brand
            // type: Schema.Types.ObjectId,
            // ref: 'Brand',
            type: String,
            required: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
        },
        year: {
            type: String,
        },
        prevPrice: {
            type: Number,
        },
        price: {
            type: Number,
            required: true,
        },
        rate: {
            type: Schema.Types.ObjectId,
            ref: 'Rate',
        },
        Favourite: {
            type: Schema.Types.ObjectId,
            ref: 'Favourite',
        },
        tags: {
            type: String,
            default: 'New',
        },
        promotion: {
            type: String,
            default: 'Акции',
        },
        description: {
            type: String,
            default: 'Описание',
        },
        image: {
            type: String,
        },
    },
    {
        timestamps: {createdAt: 'created_at'},
    },
);

module.exports = model('Product', schema);
