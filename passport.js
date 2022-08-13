const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user')
const bcrypt = require('bcrypt')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email })
        if (!user) return done(null, false, { message: 'Incorrect email or password.' })
        if (await bcrypt.compare(password, user.password)) {
            return done(null, user, { message: 'Logged In Successfully' })
        }
        return done(null, false, { message: 'Incorrect email or password.' })
    } catch (error) {
        return done(error)
    }
}
));