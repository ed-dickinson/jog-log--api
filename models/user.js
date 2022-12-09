var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var User = new Schema({

  // _id: {type:Number,required:true},

  no: {type:Number, required:false},
  email:{type:String, required:false},
  password:{type:String, required:true},
  name: {type:String, required:false},
  admin:{type:Boolean, default: false},
  joined: {type:Date, default: Date.now},
  // shoes: [{type: Schema.Types.ObjectId, ref: 'Shoe'}],
  // runs: [{type: Schema.Types.ObjectId, ref: 'Run'}]
  // shoes: [{type: Number, ref: 'Shoe'}],
  runs: [{type: Number, ref: 'Run'}],

  connected_to_strava: {type:Boolean, default: false},
  strava_id: {type: Number}

// }, { _id: false
});


module.exports = mongoose.model('User', User);
