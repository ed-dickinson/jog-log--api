var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Shoe = new Schema({

  name: {type:String,required:true},
  distance: {type:Number, default: 0},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  date: {type:Date, default: Date.now}

});


module.exports = mongoose.model('Shoe', Shoe);
