var passport = require('passport');
var FacebookStrategy = require("passport-facebook").Strategy
var User = require('../models').User;
var jwt = require('jsonwebtoken');
var session = require('express-session')
var secrete = 'talk_temple'
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LinkedInStrategy = require("passport-linkedin").Strategy



module.exports = function(app, passport) {

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false
        }
    }));


    passport.serializeUser(function(profile, done) {
        // console.log(profile[0]['dataValues'])
        console.log(profile)
        user = profile[0]['dataValues']
        // user['first_name'] = profile.profile
        token = jwt.sign({
            email: profile.email
        }, secrete, {
            expiresIn: '24hr'
        });
        done(null, profile);
    });


    passport.deserializeUser(function(id, None) {
        User.findById(id).then(function(user) {
            done(null, user)
        }).catch(function(err) {
            done(err, null)
        });
    });

    //Facebook Login
    passport.use(new FacebookStrategy({
            clientID: '219130758828657',
            clientSecret: 'cb53ed7e57e2801e81f57235e48cd386',
            callbackURL: "http://18.217.244.65:8080/auth/facebook/callback",
            profileFields: ['id', 'displayName', 'photos', 'email']
        },


        function(accessToken, refreshToken, profile, done) {
            console.log(profile)
            User.findOrCreate({
                where: {
                    email: profile._json.email
                },
                attributes: ['id', 'email', 'first_name']
            }).then(function(user) {
                done(null, user)
            }).catch(function(err) {
                done(err)
            })
        }
    ));
    //Facebook Login End

    passport.use(new GoogleStrategy({
            clientID: '540848014934-u8ik7t4212ip9ll6b4040sdlgje4259t.apps.googleusercontent.com',
            clientSecret: 'hKgbSstHwBLlS_iYp-6_WlDE',
            callbackURL: "http://18.217.244.65:8080/auth/google/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            console.log(profile)
            User.findOrCreate({
                where: {
                    email: profile.emails[0].value
                },
                attributes: ['id', 'email', 'first_name']
            }).then(function(user) {
                done(null, user)
            }).catch(function(err) {
                done(err)
            })
        }
    ));

    //Linked In Login
    passport.use(new LinkedInStrategy({
            consumerKey: '81ks0ulmdh2y03',
            consumerSecret: 'Kse3wRzyiFIJzPje',
            callbackURL: "http://18.217.244.65:8080/auth/linkedin/callback",
            profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline']
        },
        function(token, tokenSecret, profile, done) {
            console.log(profile._json.emailAddress)
            User.findOrCreate({
                where: {
                    email: profile._json.emailAddress
                },
                attributes: ['id', 'email', 'first_name']
            }).then(function(user) {
                done(null, user)
            }).catch(function(err) {
                done(err)
            })
        }
    ));
    //Linked In Login End


    //Linked In Login Route
    app.get('/auth/linkedin',
        passport.authenticate('linkedin', {
            scope: ['r_basicprofile', 'r_emailaddress']
        }));

    app.get('/auth/linkedin/callback',
        passport.authenticate('linkedin', {
            failureRedirect: '/googleerror'
        }),
        function(req, res) {
            // Successful authentication, redirect home.
            // res.redirect('/');
            res.send({
                'token': token,
                'user': user
            })
        });
    //Linked In Login Route End


    //Google Login Route
    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['https://www.googleapis.com/auth/plus.login', 'profile', 'email']
        }));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/googleerror'
        }),
        function(req, res) {
            res.send({
                'token': token,
                'user': user
            })
            // res.redirect('/google/'+token)
        });
    //Google In Login Route End

    //Facebook In Login route
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/facebookerror'
    }), function(req, res) {
        console.log("hi")
        // res.redirect('/facebook/'+token)
        res.send({
            'token': token,
            'user': user
        })
    });

    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: 'email'
    }));
    //Facebook In Login route end


    return passport


}