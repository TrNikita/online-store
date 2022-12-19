const {Schema, model} = require('mongoose');
const schema = new Schema(
    {
        userId: {
            type: Schema.Types.String,
            ref: 'User',
            required: true,
        },
        products: [
            {
                type: Schema.Types.String,
                ref: 'Product',
            },
        ],
    },
    {
        timestamps: true,
    },
);

module.exports = model('Basket', schema);
