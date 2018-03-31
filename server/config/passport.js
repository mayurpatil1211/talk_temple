var passport = require('passport');
var FacebookStrategy = require("passport-facebook").Strategy 
var User = require('../models').User;
var jwt = require('jsonwebtoken');
var session = require('express-session')
var secrete = 'talk_temple'



module.exports = function(app,passport){

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));


  passport.serializeUser(function(profile, done) {
    // console.log(profile[0]['dataValues'])
    // // console.log(profile.displayName)
    user = profile[0]['dataValues']
    // user['first_name'] = profile.profile
  token = jwt.sign({
      email:profile.email
      }, secrete, {expiresIn: '24hr'});
    done(null, profile);
  });

  // passport.serializeUser(function(user, done){
  //   token = jwt.sign({
  //     email: user.email
  //   }, secrete, {expiresIn:'24hr'});
  //   console.log(user)
  //   done(null, user.id);
  // });

  passport.deserializeUser(function(id, None){
    User.findById(id).then(function(user){
      done(null, user)
    }).catch(function(err){
      done(err, null)
    });
  });

passport.use(new FacebookStrategy({
    clientID: '219130758828657',
    clientSecret: 'cb53ed7e57e2801e81f57235e48cd386',
    callbackURL: "http://localhost:8080/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },

// User
//   .findOrCreate({where: {username: 'sdepold'}, defaults: {job: 'Technical Lead JavaScript'}})
//   .spread((user, created) => {
//     console.log(user.get({
//       plain: true
//     }))



function(accessToken, refreshToken, profile, done){
  console.log(profile)
  User.findOrCreate(
    {where:{email:profile._json.email},
    attributes: ['id','email', 'first_name']
  }).then(function(user){
    // console.log(user)
    done(null, user)
  }).catch(function(err){
    done(err)
  })
}
));

app.get('/auth/facebook/callback', passport.authenticate('facebook',{failureRedirect:'/facebookerror'}),function(req, res){
  console.log("hi")
  // res.redirect('/facebook/'+token)
  res.send({'token':token, 'user':user})
});

app.get('/auth/facebook', passport.authenticate('facebook', {scope:'email'}));

return passport


}


// Project.findOne({
//   where: {title: 'aProject'},
//   attributes: ['id', ['name', 'title']]
// }).then(project => {
//   // project will be the first entry of the Projects table with the title 'aProject' || null
//   // project.title will contain the name of the project
// })















// return db.users.findById(decodeToken.id).then(function (foundUser) {
// //It's example checking for self-learning
// if (foundUser.username == req.cookies.username) {
//   return foundUser;
// }
// //Or more logic for token authentication
// }).catch(function (err) {
// return err;
// })
// };