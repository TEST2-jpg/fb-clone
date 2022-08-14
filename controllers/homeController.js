const Post = require('../models/post')
const User = require('../models/user')

exports.getUserInfo = async (req, res, next) => {
    const userId = req.params.userId
    const user = await User.findById(userId)
    const {_id, first_name, last_name, email} = user
    await res.status(200).json({_id, first_name, last_name, email})
}

exports.getPosts = async (req, res, next) => {
    Post.find().populate({path:'author', select: ['first_name', 'last_name']}).exec((err, postList) => {
        if (err) return next(err);
        res.status(200).json({message: 'Post list fetched', postList})
    })
};


