var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');

require('dotenv').config()
const JWTsecret = process.env.JWT_SECRET;

// path is /user/

User = require('../models/user');
Count = require('../models/count');
Shoe = require('../models/shoe')

const jwtStrategy  = require("../middleware/jwt");
passport.use(jwtStrategy);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:no', function(req, res, next) {
  User.findOne({'no':req.params.no})
    .exec(function(err, user) {
      if (err) {return next(err);}
      if (user==null) {
        var err = new Error('No user found!');
        err.status = 404;
        return next(err);
      }
      return res.json({user});
    })
});

router.get('/:no/shoes', function (req,res,next) {
  Shoe.find({'user':req.params.no})
    .exec(function(err, shoes) {
      if (err) {return next(err);}
      if (shoes==null) {
        var err = new Error('No shoes found!');
        err.status = 404;
        return next(err);
      }
      return res.json({shoes});
    })
})

router.post('/new', async function(req, res, next) {
  // res.send('respond with a resource');
  let count = await Count.findOne();

  // let count = await User.countDocuments(); // this will break if any are deleted
  if (count) {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) return next(err)
    else {
      const user = new User({
        // _id: count + 1,
        no: count.user + 1,
        email: req.body.email,
        password: hashedPassword,
        name: req.body.name,
        // joined: req.body.joined//2021-08-05T00:00:00.000+00:00
      }).save(err => {
        if (err) {
          return next(err)
        }
        count.user++;
        count.save(err => {if (err) return next(err)});
        return res.status(200).send("Welcome! You've now signed up.");

      })
    };
  });
  }
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
            user: user,

        })
      }
    }
    return res.status(401).json({ message: "Auth Failed" })

});

module.exports = router;
