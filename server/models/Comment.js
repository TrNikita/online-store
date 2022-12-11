const {Schema, model} = require('mongoose');

const schema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        // на чьей станице находится комментарий
        pageId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        // кто оставил комментарий
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        // todo Rate
    },
    {
        timestamps: true,
    },
);

module.exports = model('Comment', schema);
