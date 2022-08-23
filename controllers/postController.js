const Post = require('../models/post')
const Comment = require('../models/comment')
const User = require('../models/user')

exports.getPostsComment = async (req, res, next) => {
    const postId = req.params.postId
    try {
        const post = await Post.findById(postId)
        const commentsPop = await post.populate({ path: 'comment', populate: { path: 'author', select: ['first_name', 'last_name'] }, options: { sort: { 'createdAt': -1 } } })
        await res.status(200).json({ comment: commentsPop.comment })
    } catch (error) {
        if (error) return next(error)
    }
};

exports.createPost = async (req, res, next) => {
    const { postBody, userId } = req.body
    const user = await User.findById(userId)
    const post = new Post({
        post: postBody,
        author: user._id
    })
    await post.save()
    user.posts.push(post)
    await user.save()

    res.status(201).json({
        message: 'Post created successfully!',
    });
};

exports.deletePost = async (req, res, next) => {
    const { userId, postId } = req.params
    Post.findById(postId)
        .populate('author', '_id')
        .exec(function (err, post) {
            if (err) return next(err);
            if (userId !== post.author._id.toString()) {
                res.status(401).json({ message: 'Unauthorized' })
            }
            Post.findByIdAndRemove(postId, () => res.status(200).json({ message: 'deleted' }))
        });
}

exports.postComment = async (req, res, next) => {
    const { postId } = req.params
    const { commentBody, userId } = req.body
    const post = await Post.findById(postId)
    const comment = new Comment({ comment: commentBody, author: userId })
    post.comment.push(comment)
    await comment.save()
    await post.save()
    res.status(200).json({ message: 'in postcomment post' })
}

exports.postStats = async (req, res, next) => {
    const postId = req.params.postId
    Post.findById(postId).distinct('comment', (err, comments) => {
        if (err) return next(err)
        res.status(201).json({ postId, comments })
    })
}

exports.likePost = async (req, res, next) => {
    const { postId, userId } = req.params
    const post = await Post.findOneAndUpdate({
        _id: postId
    }, { $inc: { 'likes': 1 } })

    post.likers.push(userId)

    await post.save()

    res.status(200).json({ message: 'liked', postId, post })

}

exports.unlikePost = async (req, res, next) => {
    const { postId, userId } = req.params
    const post = await Post.findOneAndUpdate({
        _id: postId
    }, { $inc: { 'likes': -1 } })

    post.likers.pull(userId)

    await post.save()

    res.status(200).json({ message: 'unliked', postId, post })

}

exports.getPostInfo = async (req, res, next) => {
    const { postId } = req.params
    const post = await Post.findById(postId)
    const postMessage = post.post
    res.status(200).json({ message: 'Received', postId, postMessage })

}

exports.editPost = async (req, res, next) => {
    const { postId } = req.params
    const { postBody } = req.body
    const post = await Post.findOneAndUpdate({ _id: postId }, { post: postBody }, {
        new: true
    })

    res.status(200).json({ message: 'Edited', postBody, post })

} 