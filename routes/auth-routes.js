const passport = require("passport");
const router = require("express").Router();

router.get("/login", (req, res) => {
  res.render("login",{ user: req.user});
});

// auth logout
router.get("/logout", (req, res) => {
  // handle with passport
  req.logout(function(){
    res.redirect('/');
  });
});

// authentication with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

// callabck route for google to redirect
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("/profile");
});

module.exports = router;
