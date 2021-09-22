var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');

User = require('../models/user');

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
        return res.status(200).send("Welcome!");

      })
    };
  });
});

module.exports = router;
