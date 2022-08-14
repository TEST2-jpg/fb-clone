const Post = require('../models/post')
const Comment = require('../models/comment')
const User = require('../models/user')

exports.getPostsComment = async (req, res, next) => {
    const postId = req.params.postId
    try {
        const post = await Post.findById(postId)
        const commentsPop = await post.populate({path: 'comment', model: Comment})
        await res.status(200).json({comment: commentsPop.comment})
    } catch (error) {
        if(error) return next(error)
    }
};

exports.createPost = async(req, res, next) => {
    const {postBody, userId} = req.body
    const user = await User.findById(userId)
    const post = await new Post({
        post: postBody,
        author : user._id
    })
    await post.save()
    user.posts.push(post)
    await user.save()
    console.log(user)
    console.log(post, userId)
    res.status(201).json({
        message: 'Post created successfully!',
    });
};