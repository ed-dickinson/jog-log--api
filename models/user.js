var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var User = new Schema({

  // _id: {type:Number,required:true},

  no: {type:Number,required:true},
  email:{type:String,required:true},
  password:{type:String,required:true},
  name: {type:String},
  admin:{type:Boolean, default: false},
  joined: {type:Date, default: Date.now},
  shoes: [{type: Schema.Types.ObjectId, ref: 'Shoe'}],
  runs: [{type: Schema.Types.ObjectId, ref: 'Run'}]

// }, { _id: false
});


module.exports = mongoose.model('User', User);
