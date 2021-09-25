var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Count = new Schema({

  user: {type:Number, default: 0, required:true},
  shoe: {type:Number, default: 0, required:true},
  run: {type:Number, default: 0, required:true},

});


module.exports = mongoose.model('Count', Count);
