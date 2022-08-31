const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const { cloudinary } = require("../cloudinary");

exports.getPostsComment = async (req, res, next) => {
  const postId = req.params.postId;
  const commentNum = req.params.skip;
  try {
    const post = await Post.findById(postId);
    const commentsPop = await post.populate({
      path: "comment",
      populate: { path: "author", select: ["first_name", "last_name"] },
      options: { sort: { createdAt: -1 }, skip: commentNum, limit: 5 },
    });
    await res.status(200).json({ comment: commentsPop.comment });
  } catch (error) {
    return next(error);
  }
};

exports.createPost = [
  body("postBody", "post must not be empty").trim(),
  async (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.file);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ message: "Validation failed", errors: errors.array() });
    }
    const { postBody, userId } = req.body;
    try {
      const user = await User.findById(userId);
      const post = new Post({
        post: postBody,
        author: user._id,
        ...(req.file && { imageUrl: req.file.path }),
        ...(req.file && { imageId: req.file.filename }),
      });
      await post.save();
      user.posts.push(post);
      await user.save();
      res.status(201).json({
        message: "Post created successfully!",
        post: post,
      });
    } catch (error) {
      return next(error);
    }
  },
];

exports.deletePost = async (req, res, next) => {
  const { userId, postId } = req.params;
  Post.findById(postId)
    .populate("author", "_id")
    .exec(function (err, post) {
      if (err || !post) return next(err);
      if (userId !== post.author._id.toString()) {
        res.status(401).json({ message: "Unauthorized" });
      }
      Post.findByIdAndRemove(postId, async () => {
        if (!post.imageUrl) return res.status(200).json({ message: "Deleted" });
        try {
          await cloudinary.uploader.destroy(post.imageId);
          res.status(200).json({ message: "deleted" });
        } catch (error) {
          return next(error);
        }
      });
    });
};

exports.postComment = [
  body("commentBody", "comment must not be empty").trim().isLength({ min: 1 }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ message: "Validation failed", error: errors.array() });
    }
    try {
      const { postId } = req.params;
      const { commentBody, userId } = req.body;
      const post = await Post.findById(postId);
      const comment = new Comment({ comment: commentBody, author: userId });
      post.comment.push(comment);
      await comment.save();
      await post.save();
      const popcomment = await comment.populate("author");
      res.status(200).json({ comment: popcomment });
    } catch (error) {
      return next(error);
    }
  },
];

exports.postStats = async (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId).distinct("comment", (err, comments) => {
    if (err) return next(err);
    res.status(201).json({ postId, comments });
  });
};

exports.likePost = async (req, res, next) => {
  const { postId, userId } = req.params;
  const post = await Post.findOneAndUpdate(
    {
      _id: postId,
    },
    { $inc: { likes: 1 } }
  );

  post.likers.push(userId);

  await post.save();

  res.status(200).json({ message: "liked", postId, post });
};

exports.unlikePost = async (req, res, next) => {
  const { postId, userId } = req.params;
  const post = await Post.findOneAndUpdate(
    {
      _id: postId,
    },
    { $inc: { likes: -1 } }
  );

  post.likers.pull(userId);

  await post.save();

  res.status(200).json({ message: "unliked", postId, post });
};

exports.getPostInfo = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    const postMessage = post.post;
    res.status(200).json({ message: "Received", postId, postMessage });
  } catch (error) {
    return next(error);
  }
};

exports.editPost = async (req, res, next) => {
  const { postId } = req.params;
  const { postBody } = req.body;
  try {
    const post = await Post.findOneAndUpdate(
      { _id: postId },
      { post: postBody },
      {
        new: true,
      }
    );

    res.status(200).json({ message: "Edited", postBody, post });
  } catch (error) {
    return next(error);
  }
};
