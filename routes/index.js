var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.json({jog: 'log'});
});

Count = require('../models/count');

router.post('/initcount', function(req, res, next) {
    // if (err) return next(err)
    // else {
      const count = new Count({
        // email: req.body.email,
        user: 1, shoe: 1, run: 1
        // password: hashedPassword,
      }).save(err => {
        if (err) {
          return next(err)
        }
        return res.status(200).send("Count init.");

      })
    // };
});

module.exports = router;
