const Post = require('../models/post')
const Comment = require('../models/comment')

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
