const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    caption: { type: String },
    post: { type: String, required: true },
    likes: {type: Number},
    likers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],

}, { timestamps: true })


module.exports = mongoose.model('Post', PostSchema);