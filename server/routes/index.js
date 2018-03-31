const userController = require('../controllers').users;

module.exports = (app)=>{
	app.get('/api', (req, res)=>res.status(200).send({
		message:'Welcome to the Users API!'
	}));

	app.post('/api/users', userController.create);
	app.post('/api/login', userController.login);
	app.get('/api/list', userController.list);
	};


