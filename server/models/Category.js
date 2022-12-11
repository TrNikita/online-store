const {Schema, model} = require('mongoose');
const schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = model('Category', schema);
