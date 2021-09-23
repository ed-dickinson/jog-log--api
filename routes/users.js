var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');

require('dotenv').config()
const JWTsecret = process.env.JWT_SECRET;

User = require('../models/user');

const jwtStrategy  = require("../middleware/jwt");
passport.use(jwtStrategy);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/new', function(req, res, next) {
  // res.send('respond with a resource');
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) return next(err)
    else {
      const user = new User({
        email: req.body.email,
        password: hashedPassword,
        // joined: req.body.joined//2021-08-05T00:00:00.000+00:00
      }).save(err => {
        if (err) {return next(err)}
        // res.redirect('user/' + req.body.username);
        // res.render('welcome', {title: req.body.username, username: req.body.username});
        return res.status(200).send("Welcome! You've now signed up.");

      })
    };
  });
});

router.post('/login', async (req, res) => {
    let { email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {

      const match = await bcrypt.compare(password, user.password);

      if (match) {
        const opts = {}
        opts.expiresIn = '30d'; //is this safe?
        const secret = JWTsecret
        const token = jwt.sign({ email }, secret, opts);
        return res.status(200).json({
            message: "Auth Passed",
            token,
            admin: user.admin,
            user: user._id
        })
      }
    }
    return res.status(401).json({ message: "Auth Failed" })

});

module.exports = router;
