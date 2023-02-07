const express = require("express");
const app = express();
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const passportSetup = require("./config/passport-setup");
const keys = require("./config/keys");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

// set view engine
app.set("view engine", "ejs");

app.use(
  session({
    secret: keys.session.cookieKey,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

// creat home route
app.get("/", (req, res) => {
  res.render("home");
});

mongoose
  .connect(keys.mongodb.dbURI, () => {
    app.listen(3000, () => {
      console.log("http://localhost:3000");
    });
  })
  .catch((error) => console.log(error));
