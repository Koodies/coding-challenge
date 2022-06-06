require("dotenv").config();
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Users = require("../dao/users");

// At a minimum, you must pass these options (see note after this code snippet for more)
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.PUB_KEY,
};

passport.use(
  "jwt",
  new JwtStrategy(options, async (jwt_payload, done) => {
    const user = await Users.getUser(
      { token: jwt_payload.sub },
      { email: 1, token: 1, _id: 0 }
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
