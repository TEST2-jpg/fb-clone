const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema ({
    caption: {type: String},
    post: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    comment: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
})


module.exports = mongoose.model('Post', PostSchema);