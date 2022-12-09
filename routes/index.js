var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.json({jog: 'log'});
});

Count = require('../models/count');

router.post('/countinit', function(req, res, next) {

      const count = new Count({
        user: 1, shoe: 1, run: 1
      }).save(err => {
        if (err) {
          return next(err)
        }
        return res.status(200).json({message: "Count init."});
      })
});

router.post('/countreset', async function(req, res, next) {

    let count = await Count.findOne();

    if (count) {

      count.user = 0;
      count.shoe = 0;
      count.run = 0;
      count.save(err => {
        if (err) {
          return next(err)
        }
        return res.status(200).json({message: 'count reset', count});

      })
    }
});

module.exports = router;
