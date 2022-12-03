const {Schema, model} = require('mongoose');

const schema = new Schema(
    {
        rate: {
            type: Number,
            default: 0,
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: {createdAt: 'created_at'},
    },
);

module.exports = model('Rate', schema);
