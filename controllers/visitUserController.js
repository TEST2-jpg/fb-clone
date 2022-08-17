const Post = require('../models/post')
const User = require('../models/user')

exports.getFeed = async (req, res, next) => {
    const {userId} = req.params
    Post.find({author: userId }).sort({ createdAt: -1 })
    .populate({ path: 'author', select: ['first_name', 'last_name'] })
    .populate({ path: 'comment', options: { limit: 2, sort: { 'createdAt': -1 } }, populate: {path: 'author' , select: ['first_name', 'last_name']} })
    .exec((err, postList) => {
        if (err) return next(err);
        console.log(postList)
        res.status(200).json({ message: 'Post list fetched', postList })
    })
    
};


