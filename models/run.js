var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Run = new Schema({

  date: {type:Date, default: Date.now, required:true},
  distance: {type:Number, default: 0, required:true},
  elevation: {type:Number, default: 0},
  description: {type:String,required:true},
  shoe: {type: Schema.Types.ObjectId, ref: 'Shoe'},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  no: {type:Number,required:true},

});


module.exports = mongoose.model('Run', Run);
