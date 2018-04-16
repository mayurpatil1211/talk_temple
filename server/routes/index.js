const userController = require('../controllers').users;
const fileController = require('../controllers').files;
const favouriteController = require('../controllers').favourite;
const questionController = require('../controllers').question;
const auth = require('../config/auth')
var jwt = require('jsonwebtoken');

module.exports = (app)=>{

	function verifyToken(req, res, next){
	var token = req.body.token || req.body.query || req.headers['x-access-token'];
	if(token){
		//verify token
		jwt.verify(token, auth.secrete, function(err,decoded){
			if(err){
			 res.json({success:false, message:'Invalid Token'})
			}else{
				req.decoded = decoded
				next();
			}

		});
		}else{
			res.json({success:false, message:'No token Provided'})
		}
	}



	app.get('/api', (req, res)=>res.status(200).send({
		message:'Welcome to the Talk Temple API!'
	}));

	app.post('/api/users', userController.create);

	app.post('/api/login', userController.login);
	app.post('/api/social-login', userController.socialLogin);
	app.post('/api/logout', userController.logout);


	//uploading url
	app.delete('/api/video/:videoId', fileController.deleteVideo);
	app.get('/api/video', fileController.getVideo);
	app.post('/api/video', fileController.video);
	app.put('/api/video', fileController.updateVideo);

	app.post('/api/image', fileController.image);
	app.get('/api/image', fileController.getImage);
	app.put('/api/image', fileController.updateImage);
	app.delete('/api/image/:imageId', fileController.deleteImage);

	app.post('/api/thought', fileController.thought);
	app.put('/api/thought', fileController.updateThought);
	app.get('/api/thought', fileController.getThought);
	app.delete('/api/thought/:thoughtId', fileController.deleteThought);

	app.post('/api/song', fileController.song);
	app.get('/api/song', fileController.getSongs);
	app.delete('/api/song/:songId', fileController.deleteSong);
	app.put('/api/song', fileController.updateSong);

	app.get('/api/files', fileController.getAll);
	// app.get('/api/latest', fileController.getTodays);

	//Favourite
	app.post('/api/fav-song/:userId', favouriteController.addfavSong);
	app.get('/api/fav-song/:userId', favouriteController.getFavSong);
	app.delete('/api/fav-song/:userId', favouriteController.removeFavSong);

	app.post('/api/fav-video/:userId', favouriteController.addfavVideo);
	app.get('/api/fav-video/:userId', favouriteController.getFavVideo);
	app.delete('/api/fav-video/:userId', favouriteController.removeFavVideo);


	app.post('/api/fav-image/:userId', favouriteController.addFavImage);
	app.get('/api/fav-image/:userId', favouriteController.getFavImage);
	app.delete('/api/fav-image/:userId', favouriteController.removeFavImage);

	app.post('/api/fav-thought/:userId', favouriteController.addfavThought);
	app.get('/api/fav-thought/:userId', favouriteController.getFavThought);
	app.delete('/api/fav-thought/:userId', favouriteController.removeFavThought);

	app.get('/api/favourite/:userId', favouriteController.getFavourite);


	//Question
	app.post('/api/question', questionController.create);
	app.put('/api/question', questionController.update);
	app.get('/api/question', questionController.get);
	app.delete('/api/question', questionController.delete);

	//Users Questions
	app.get('/api/users/questions/:userId', questionController.getUsersQuestion);

	//Answer the question
	app.post('/api/question/answer', questionController.answerTheQuestion);

	};


