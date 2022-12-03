const {Schema, model} = require('mongoose');
const schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: {createdAt: 'created_at'},
    },
);

module.exports = model('Brand', schema);
