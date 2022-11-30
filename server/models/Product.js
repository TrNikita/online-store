const {
    Schema,
    model,
} = require('mongoose');

const schema = new Schema({
        title: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        category: {
            type: String,
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
            type: Number,
        },
        isFavourite: {
            type: Boolean,
        },
        tags: {
            type: String,
        },
        promotion: {
            type: String,
        },
        description: {
            type: String,
        },
        configuration: {
            type: String,
        },
        image: {
            type: String,
        },
    },
    {
        timestamps: {createdAt: 'created_at'},
    });

module.exports = model('Product', schema);
