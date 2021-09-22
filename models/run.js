var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Run = new Schema({

  date: {type:Date, default: Date.now, required:true},
  distance: {type:Number, default: 0, required:true},
  elevation: {type:Number, default: 0},
  description: {type:String,required:true},
  shoes: {type: Schema.Types.ObjectId, ref: 'Shoes'},
  user: {type: Schema.Types.ObjectId, ref: 'User'},

});


module.exports = mongoose.model('Run', Run);
