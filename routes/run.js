var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');

require('dotenv').config()
const JWTsecret = process.env.JWT_SECRET;

User = require('../models/user');
Shoe = require('../models/shoe');
Run = require('../models/run');
Test = require('../models/test');

const jwtStrategy  = require("../middleware/jwt");
passport.use(jwtStrategy);

//path is /run/

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({index: 'run'});
});

router.get('/all', function(req, res, next) {
  Run.find()
    .exec(function(err, runs) {
      if (err) {return next(err);}
      if (runs==null) {
        var err = new Error('No run found!');
        err.status = 404;
        return next(err);
      }
      return res.json({runs});
    })
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
  // let shoe = await Shoe.findOne({'no':req.body.shoe});
  let user = await User.findOne({'no':req.body.user});

  // let count = await User.countDocuments(); // this will break if any are deleted
  if (count && user) {

    const run = new Run({
      no: count.run + 1,
      user: req.body.user,

      title: req.body.title,
      date: req.body.date,
      description: req.body.description,
      strava_id: req.body.strava_id
      // if no strava_id then it will just skip it. do ?: to make null
    }).save(err => {
      if (err) {
        return next(err)
      }
      count.run++;
      count.save(err => {if (err) return next(err)});

      user.runs.push(count.run);
      user.save(err => {if (err) return next(err)});

      return res.status(200).json({message: "Jog logged!", run});

    })
  }
});

router.post('/edit/:no', async (req, res, next) => {
    // let { id, password } = req.body;
    let run = await Run.findOne({'no':req.params.no});

    // errr hello this DON'T DO NOTHIN!




    if (run) {

      run.title = req.body.title
      run.description = req.body.description
      run.date = req.body.date

      run.save(err => {if (err) return next(err)});

      return res.status(200).json({message: "Jog logged!"})
    } else {
      return res.status(204).json({ message: "No run found" })
    }
    return res.status(401).json({ message: "Run edit failed" })

});

router.post('/import', async function(req, res, next) {


    const run = new Run({
      no: req.body.no,
      user: req.body.user,
      shoe: req.body.shoe,

      distance: req.body.distance,
      elevation: req.body.elevation,
      date: req.body.date,
      description: req.body.description,
      // imported: req.body.imported,
    }).save(err => {
      if (err) {
        return next(err)
      }


      return res.status(200).json({message: "Run imported!", run});

    })

});

module.exports = router;
