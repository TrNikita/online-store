const {
    Schema,
    model,
} = require('mongoose');

const schema = new Schema({
        name: {type: String},
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {type: String},
        image: String,
        rate: Number,
        sex: {
            type: String,
            enum: ['male', 'female', 'other'],
        },
    },
    {
        timestamps: {createdAt: 'created_at'},
    });

module.exports = model('User', schema);
