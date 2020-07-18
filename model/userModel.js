const mongoose = require("mongoose");
const crypto = require("crypto");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type : String,
        required: true
    },
    hash: String,
    salt: String,
    isVerfied : {
     type : Boolean,
     default : false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString("hex");

    this.hash = crypto.pbkdf2Sync(password,this.salt,1000,64,'sha512').toString('hex');
}

module.exports = mongoose.model("User", userSchema)