if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user')
const bcrypt = require('bcrypt')
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

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

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_SECRET
}, async (jwtPayload, done) => {
    try {
        return done(null, jwtPayload._id)
    } catch (error) {
        return done(error)
    }
}
));