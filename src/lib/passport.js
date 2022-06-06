require("dotenv").config();
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Users = require("../dao/users");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.PUB_KEY,
};

passport.use(
  "jwt",
  new JwtStrategy(options, async (jwt_payload, done) => {
    const user = await Users.getUser(
      { email: jwt_payload.email },
      { email: 1, _id: 1 }
    );
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
);

module.exports = {
  initialize: passport.initialize(),
};
