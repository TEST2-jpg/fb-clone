const Post = require("../models/post");
const User = require("../models/user");

exports.getUserInfo = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    const { _id, first_name, last_name, email } = user;
    await res.status(200).json({ _id, first_name, last_name, email });
  } catch (error) {
    return next(error)
  }
};

exports.getPosts = async (req, res, next) => {
  Post.find()
    .sort({ createdAt: -1 })
    .populate({ path: "author", select: ["first_name", "last_name"] })
    .populate({
      path: "comment",
      options: { limit: 2, sort: { createdAt: -1 } },
      populate: { path: "author", select: ["first_name", "last_name"] },
    })
    .exec((err, postList) => {
      if (err) return next(err);
      res.status(200).json({ message: "Post list fetched", postList });
    });
};
