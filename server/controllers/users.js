const User = require('../models').User;
var jwt = require('jsonwebtoken');
var secrete = 'talk_temple_codematrix'

module.exports={
//--------------------------User Register--------------------------------

	create(req, res){
		if(req.body.email!='' && req.body.email!=null && req.body.password!='' && req.body.password!=null){
			return User
			.findOne({where:{email:req.body.email},})
			.then(user=>{
				if(!user){
					pass = User.generateHash(req.body.password)
					return User
					.create({
						email: req.body.email,
						password:pass,
						first_name : req.body.first_name,
						last_name: req.body.last_name
					})
					.then(user=>res.status(201).send({message:"User Created Successfully", message_code: 1000}))
					.catch(error=>res.status(400).send({message:"Not able to create User, Please check credentials", message_code:1001}))
				}else{
					return res.status(400).send({message:"User with this email already exists", message_code: 1002})
				}
			})
		}else{
			return res.status(400).send({message:"Null shall\'t pass, check the credentials you are sending", message_code:1003})
		}
		
	},



	// create(req, res){
	// 	if(req.body.email!='' && req.body.email!=null && req.body.password!='' && req.body.password!=null){
	// 		pass = User.generateHash(req.body.password)
	// 		console.log(pass)
	// 		return User
	// 		.create({
	// 			email : req.body.email,
	// 			password :pass,
	// 			first_name: req.body.first_name,
	// 			last_name: req.body.last_name
	// 		})
	// 		.then(user=>res.status(201).send(user))
	// 		.catch(error=>res.status(400).send({message:error.errors[0].message}));
	// 	}else{
	// 		return res.status(400).send({message:"Null shall\'t pass"})
	// 	}
		
	// },
//--------------------------Login--------------------------------
	login(req, res){
		if(req.body.email!='' && req.body.email!=null && req.body.password!='' && req.body.password!=null){
		return User
			.findOne({
				where:{email:req.body.email},
			}).then(user=>{
				if(!user){
					return res.status(404).send({
						message:'Invalid User Email', message_code: 1007
					})
				}
				if(user.password){
                if(User.comparePassword(user.password, req.body.password)){
                        var token = jwt.sign({
                                email:user.email
                        }, secrete, {expiresIn: '24hr'});
                        return User
                        .findOne({
                                where:{email:user.email},
                                attributes: ['id', 'email', 'first_name', 'last_name']
                        }).then(user=>res.status(200).send({
                                'user':user,
                                'token':token,
                                'message': "User Logged In Successfully",
                                'message_code': 1005
                        }))
                }
                else{return res.status(400).send({message:"Invalid email or password", message_code: 1007})}
                }else{
                        return res.status(400).send({message:"May be User has to log in with social App", message_code: 1006})
                }

				return res.status(400).send({message:"Invalid email or password", message_code: 1007})
			})
		}else{
			return res.status(400).send({message:"Null shall\'t pass", message_code:1003})
		}
	},

//--------------------------Social Login--------------------------------
	socialLogin(req, res){
		if(req.body.email!='' && req.body.email!=null && req.body.token!=null){
			return User.findOrCreate(
				{where:{email:req.body.email},}).then(function(user){
					if(!user){
						return res.status(404).send({message:'Could\'nt Log In Please Try again'})
					}
					else{
						var token = jwt.sign({
                                email:user[0]['dataValues']['email']
                        }, secrete, {expiresIn: '24hr'});
                        return User
                        .findOne({
                                where:{email:req.body.email},
                                attributes: ['id', 'email']
                        }).then(user=>res.status(200).send({
                                'user':user,
                                'token':token,
                                'message': "User Logged In Successfully",
                                'message_code': 1005
                        }))
					}
				}).catch(function(err){
					return res.status(400).send({message:"Not able to create User, Please check credentials", message_code:1001})
				})
			return res.status(400).send({message:"Invalid email or password", message_code: 1007})
		}else{
			return res.status(400).send({message:"Null shall\'t pass", message_code:1003})
		}
	}




}
