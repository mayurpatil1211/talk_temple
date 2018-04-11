const userController = require('../controllers').users;
const fileController = require('../controllers').files;

module.exports = (app)=>{
	app.get('/api', (req, res)=>res.status(200).send({
		message:'Welcome to the Talk Temple API!'
	}));

	app.post('/api/users', userController.create);

	app.post('/api/login', userController.login);
	app.post('/api/social-login', userController.socialLogin);

	app.post('/api/song', fileController.song);
	app.post('/api/video', fileController.video);
	app.post('/api/image', fileController.image);
	app.post('/api/thought', fileController.thought);

	app.post('/api/fav-song/:userId', fileController.addfavSong);
	app.get('/api/fav-song/:userId', fileController.getFavSong);
	app.delete('/api/fav-song/:userId', fileController.removeFavSong);

	app.post('/api/fav-video/:userId', fileController.addfavVideo);
	app.get('/api/fav-video/:userId', fileController.getFavVideo);
	app.delete('/api/fav-video/:userId', fileController.removeFavVideo);

	app.post('/api/fav-image/:userId', fileController.addFavImage);
	app.get('/api/fav-image/:userId', fileController.getFavImage);

	app.post('/api/fav-thought/:userId', fileController.addfavThought);
	app.get('/api/fav-thought/:userId', fileController.getFavThought);
	app.delete('/api/fav-thought/:userId', fileController.removeFavThought);

	};


