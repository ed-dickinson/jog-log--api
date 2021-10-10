var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');

require('dotenv').config()
const JWTsecret = process.env.JWT_SECRET;

User = require('../models/user');
Shoe = require('../models/shoe');
Run = require('../models/run')

const jwtStrategy  = require("../middleware/jwt");
passport.use(jwtStrategy);

//path is /run/

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({index: 'run'});
});

router.get('/:no', function(req, res, next) {
  Run.findOne({'no':req.params.no})
    .exec(function(err, run) {
      if (err) {return next(err);}
      if (run==null) {
        var err = new Error('No run found!');
        err.status = 404;
        return next(err);
      }
      return res.json({run});
    })
});

router.post('/new', async function(req, res, next) {
  // res.send('respond with a resource');
  let count = await Count.findOne();
  if (req.body.shoe) {
    let shoe = await Shoe.findOne({'no':req.body.shoe});
  }


  // let count = await User.countDocuments(); // this will break if any are deleted
  if (count) {

    const run = new Run({
      no: count.run + 1,
      user: req.body.user,
      shoe: req.body.shoe,

      distance: req.body.distance,
      elevation: req.body.elevation,
      date: req.body.date,
      description: req.body.description,
    }).save(err => {
      if (err) {
        return next(err)
      }
      count.run++;
      count.save(err => {if (err) return next(err)});
      if (shoe) {
        shoe.distance += req.body.distance;
        shoe.save(err => {if (err) return next(err)});
      }
      return res.status(200).json({message: "New run added.", run});

    })
  }
});

module.exports = router;
