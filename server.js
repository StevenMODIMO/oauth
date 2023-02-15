require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const passportSetup = require("./config/passport-setup");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const app = express();

// set view engine
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

// Initialize passport to use cookies
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

// create home route
app.get("/", (req, res) => {
  res.render('home', { user: req.user });
});

// database connection and server launch
mongoose.connect(process.env.MONGO_URI, () => {
  app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
  });
});
