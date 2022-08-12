const User = require('../models/user')
const bcrypt = require('bcrypt')

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
