const httpStatus = require("http-status-codes");
const passport = require("passport");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const sgMail = require('@sendgrid/mail');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'projects1321@gmail.com',
        pass: 'Random@21'
    }
})




sgMail.setApiKey("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");

const User = require("../model/userModel");
const Token = require("../model/tokenModel");

const { setPassword } = require("../helper");

module.exports = {
    register: async (req, res) => {
        const { salt, hash } = await setPassword(req.body.password);
        let user = { salt, hash, username: req.body.username, email: req.body.email }
        console.log(user);
        User.create(user).then((response) => {
            console.log(response);
            Token.create({
                _userId: response._id,
                token: crypto.randomBytes(16).toString('hex')
            })
                .then((result) => {
                    console.log(response.email);

                  const mailOptions = {
                        to: response.email,
                        from: 'admin@readersfest.com',
                        subject: 'Account Verification Token',
                        text: 'Hello'
                    };
                  /*
                    transporter.sendMail(mailOptions, (err, info) => {
                        if (err) {
                            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
                        }
                        return res.status(httpStatus.OK).send(info)
                    }) */
                      sgMail.send(mailOptions).then((mailConfirmation) => {
                         return res.status(httpStatus.OK).send(mailConfirmation)
                     })
                         .catch((error) => {
                             return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
                         }) 


                    /* var transporter = nodemailer.createTransport
                        ({ service: 'Sendgrid', auth: { user: 'nash.219@gmail.com', pass: 'ironmantwobale' } });
                    var mailOptions =
                    {
                        from: 'nash.219@gmail.com',
                        to: response.email,
                        subject: 'Account Verification Token',
                        text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:localhost:4200\/\/' + '\/confirmation\/' + res.token + '.\n'
                    };
                    transporter.sendMail(mailOptions, function (err) {
                        if (err) { return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ msg: err }); }
                        res.status(httpStatus.OK).send('A verification email has been sent to ' + response.email + '.');
                    }); */
                })
                .catch((error) => {
                    console.log(error);
                    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
                })
        })
            .catch((error) => {
                console.log(error);
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
            })
    },
    login: (req, res, next) => {
        console.log(req.body);

        passport.authenticate('local', (err, passportUser, info) => {
            if (err) {
                return next(err)
            }
            if (!passportUser) {
                return res.status(httpStatus.UNAUTHORIZED).send({
                    message: "User not found."
                })
            }
            if (passportUser) {
                return res.status(httpStatus.OK).send({
                    user: passportUser
                })
            }
        })(req, res, next);
    },
    confirmation: (req, res) => {

    }
}
