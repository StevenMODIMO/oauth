require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/user-model");

// Serailize User
passport.serializeUser((user, done) => {
  done(null, user.id)
})

// Deserialize User
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user)
  })
})

// strategy to use and and a callback   function
passport.use(
  new GoogleStrategy(
    {
      // options for the strategy
      callbackURL: "/auth/google/redirect",
      clientID: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      // check if user exists
      User.findOne({ googleID: profile.id }).then((currentUser) => {
        if (currentUser) {
          // already have user
          console.log("Current user is:" + currentUser);
          done(null, currentUser)
        } else {
          // if not, create user in the db
          new User({
            username: profile.displayName,
            googleID: profile.id,
            thumbnail: profile._json.picture
          })
            .save()
            .then((newUser) => {
              console.log("New user created: " + newUser);
              done(null, newUser)
            });
        }
      });
    }
  )
);
