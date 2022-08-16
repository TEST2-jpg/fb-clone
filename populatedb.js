if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const { faker } = require('@faker-js/faker')
const User = require('./models/user')
const Post = require('./models/post')
const Comment = require('./models/comment')

const mongoose = require('mongoose');
const mongoDB = process.env.MONGO_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const users = []

const populateUser = async () => {
    await User.deleteMany({})
    for (let index = 0; index < 6; index++) {
        const user = new User({
            first_name: function () {
                let user = faker.name.firstName()
                users.push(user)
                return user
            }(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        })
        await user.save()
        console.log(user)
    }
    console.log('InPOPULATE')
}

const populatePost = async () => {
    await Post.deleteMany({})
    await Comment.deleteMany({})
    for (let index = 0; index < 5; index++) {
        console.log(users[Math.floor(Math.random() * users.length)])
        const user = await User.findOne({first_name: users[Math.floor(Math.random() * users.length)]})
        const post = new Post({ post: faker.hacker.phrase(), author: user._id })
        user.posts.push(post)
        const comment = new Comment({ comment: faker.hacker.phrase(), author: user._id })
        post.comment.push(comment)
        console.log(comment, post)
        await comment.save()
        await post.save()
        await user.save()
    }
}

populateUser().then(() => populatePost()).then(() => mongoose.connection.close())
