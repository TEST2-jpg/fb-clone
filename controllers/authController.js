if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { body, validationResult } = require("express-validator");

exports.registerUser = [
  body("formData.email")
    .notEmpty()
    .withMessage("Input an email")
    .custom(async (val) => {
      const user = await User.findOne({ email: val });
      if (user !== null) return Promise.reject();
    })
    .withMessage("Email already in use")
    .normalizeEmail(),
  body("formData.password", "Minimum of 6 characters")
    .trim()
    .isLength({ min: 6 }),
  body("formData.first_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Input your first name")
    .isLength({ max: 12 })
    .withMessage("Maximum of 12 characters"),
  body("formData.last_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Input your Last name")
    .isLength({ max: 12 })
    .withMessage("Maximum of 12 characters"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ message: "Validation failed", errors: errors.array() });
    }
    const { first_name, last_name, email, password } = req.body.formData;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
      first_name,
      last_name,
      email,
      password: hash,
    });
    const savedUser = await user.save();
    res.status(201).json({
      message: "User created successfully!",
      userId: savedUser._id,
    });
  },
];

exports.loginUser = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(400).json({
        message: "Something went wrong",
        error: err,
      });
    }
    if (!user) {
      return res.status(403).json({
        mess: info.message,
      });
    }
    req.login(user, { session: false }, (err) => {
      const { _id, first_name, last_name } = user;
      if (err) {
        res.send(err);
      }
      const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.json({ _id, first_name, last_name, token });
    });
  })(req, res);
};
