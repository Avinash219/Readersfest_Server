const mongoose = require("mongoose");
const passport = require("passport");

const User = require("../model/userModel");
const { validatePassword } = require('../helper');

const LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy({
    usernamaeField: 'username'
}, (username, password, done) => {
    User.findOne({
        username: username
    }).then((response) => {
        console.log(response);
        if (!response) {
            return done(null, false, {
                errors: 'username  is invalid'
            })
        }
        if(!response.isVerified){
            return done(null, false, {
                errors: 'Email is not verified.'
            })
        }
        validatePassword(password,response.hash,response.salt).then((result) => {
            console.log(result);
            if (!result) {
                return done(null, false, {
                    errors: 'password  is invalid'
                })
            }
            return done(null, response);
        })
    })
        .catch(done)
}))
