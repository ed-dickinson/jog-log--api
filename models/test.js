var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Test = new Schema({

  date: {type:Date, default: Date.now, required:true},
  // distance: {type:Number, default: 0, required:true},
  // elevation: {type:Number, default: 0},
  title: {type:String, requied: false},
  description: {type:String, required:true},
  // shoe: {type: Schema.Types.ObjectId, ref: 'Shoe'},
  // user: {type: Schema.Types.ObjectId, ref: 'User'},
  // shoe: {type: Number, ref: 'Shoe'},
  user: {type: Number, ref: 'User'},
  no: {type:Number,required:true},
  strava_id: {type: Number, required: false}
  // imported: {type:String},

});


module.exports = mongoose.model('Test', Test);
