var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');

require('dotenv').config()
const JWTsecret = process.env.JWT_SECRET;

User = require('../models/user');
Shoe = require('../models/shoe');

const jwtStrategy  = require("../middleware/jwt");
passport.use(jwtStrategy);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({index: 'shoes'});
});

router.get('/:no', function(req, res, next) {
  Shoe.findOne({'no':req.params.no})
    .exec(function(err, shoe) {
      if (err) {return next(err);}
      if (shoe==null) {
        var err = new Error('No shoe found!');
        err.status = 404;
        return next(err);
      }
      return res.json({shoe});
    })
});

router.post('/new', async function(req, res, next) {
  // res.send('respond with a resource');
  let count = await Count.findOne();
  let user = await User.findOne({'no':req.body.user});

  // let count = await User.countDocuments(); // this will break if any are deleted
  if (count && user) {

    const shoe = new Shoe({
      no: count.shoe + 1,
      name: req.body.name,
      user: req.body.user,
      // joined: req.body.joined//2021-08-05T00:00:00.000+00:00
    }).save(err => {
      if (err) {
        return next(err)
      }
      count.shoe++;
      // count.save(err => {if (err) return next(err)});
      user.shoes.push(count.shoe+1);
      user.save(err => {if (err) return next(err)});
      return res.status(200).json({message: "New shoe added.", shoe});

    })
  }
});

module.exports = router;
