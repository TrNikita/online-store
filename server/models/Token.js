const {
    Schema,
    model,
} = require('mongoose');

const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    refreshToken: {
        type: String,
        required: true,
    },
}, {
    timestamps: {createdAt: 'created_at'},
});

module.exports = model('Token', schema);
