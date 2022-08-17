if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const passport = require('passport')

exports.registerUser = async (req, res, next) => {
    const {first_name, last_name, email, password} = req.body.formData
    const hash = await bcrypt.hash(password, 12)
    const user = new User({
        first_name,
        last_name,
        email,
        password: hash
    })
    const savedUser = await user.save()
    res.status(201).json({
        message: 'User created successfully!',
        userId: savedUser._id
    });
};

exports.loginUser = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something went wrong',
                mess: info.message
            });
        }
        req.login(user, { session: false }, (err) => {
            const {_id, first_name, last_name} = user
            if (err) {
                res.send(err);
            }
            const token = jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '1h'});
            return res.json({ _id, first_name, last_name, token });
        });
    })(req, res);
}
