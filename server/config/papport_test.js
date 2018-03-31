
var passport = require('passport');
var FacebookStrategy = require("passport-facebook").Strategy 
var User = require('../models/user')
var jwt = require('jsonwebtoken');
var session = require('express-session')
var secrete = 'mayurpatil'
var findOrCreate = require('mongoose-find-or-create')

 module.exports=function(app, passport){

	app.use(passport.initialize());
	app.use(passport.session());
	app.use(session({
	  secret: 'keyboard cat',
	  resave: false,
	  saveUninitialized: true,
	  cookie: { secure: false }
	}));

	passport.serializeUser(function(user, done) {
		// console.log(user)
	token = jwt.sign({
			username: user.username, email:user.email
			}, secrete, {expiresIn: '24hr'});
	  done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
	  User.findById(id, function(err, user) {
	    done(err, user);
	  });
	});


	passport.use(new FacebookStrategy({
		clientID: '219130758828657',
		clientSecret: 'cb53ed7e57e2801e81f57235e48cd386',
		callbackURL: "http://localhost:8080/auth/facebook/callback",
		profileFields: ['id', 'displayName', 'photos', 'email']
	},
	function(accessToken, refreshToken, profile, done) {
		console.log(profile._json.email)
		console.log(profile.displayName)
		console.log(profile.password)
		User.findOrCreate({email:profile._json.email},(err, user)=>{
			if(err) done(err);

			if(user && user !=null){
				done(null, user);
			}else{
				done(err);
			}
		})
		done(null, profile);

// 		MyModel.findOrCreate({ name: 'Mike' }, { slug: 'mike' }, { appendToArray: true }, (err, result) => {
//   // my new or existing model is loaded as result
// })
		// User.findOne({email:profile._json.email}).select('username password email').exec(function(err, user){
		// 	if(err) done(err);

		// 	if(user && user !=null){
		// 		done(null, user);
		// 	}else{
		// 		done(err);
		// 	}
		// })
		// done(null, profile);
	  }
	));

app.get('/auth/facebook/callback',passport.authenticate('facebook',{ failureRedirect: '/facebookerror' }), function(req, res){
	res.send({'token':token})
});

app.get('/auth/facebook',passport.authenticate('facebook', { scope: 'email' }));


 return passport
 }