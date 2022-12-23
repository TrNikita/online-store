const {Schema, model} = require('mongoose');

const schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        brand: {
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
        tags: {
            type: String,
            default: 'New',
        },
        description: {
            type: String,
            default: '',
        },
        imgUrl: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = model('Product', schema);
