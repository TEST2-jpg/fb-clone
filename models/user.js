const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema ({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]

})

UserSchema.virtual('name').get(() => {
    return `${this.first_name} ${this.last_name}`
})

module.exports = mongoose.model('User', UserSchema);