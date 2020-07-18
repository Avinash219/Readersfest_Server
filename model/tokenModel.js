const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  _userId : {
      type : Schema.Types.ObjectId,
      required : true,
      ref : 'User'
  },
  token : {
      type : String,
      required : true
  },
  createdAt : {
      type : Date,
      default : Date.now,
      required : true,
      expires : 43200
  }
})

module.exports = mongoose.model("Token",tokenSchema);