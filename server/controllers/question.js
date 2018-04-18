const User = require('../models').User;
const Question = require('../models').Question;
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');



var options = {
  auth: {
    api_user: '',
    api_key: ''
  }
}


var client = nodemailer.createTransport(sgTransport(options));

module.exports = {

	create(req, res) {
		if (req.body.question != '' && req.body.question != null && req.body.userId != '' && req.body.userId != null) {
			return Question.create({
					question: req.body.question,
					userId: req.body.userId
				}).then(question => res.status(200).json({
					message: 'Thank you for submitting your question, Our team will reply to your question by e-mail.',
					message_code: 1000
				}))
				.catch(err => res.status(400).json({
					message: 'Error during creating Question',
					message_code: 1001,
					err: err
				}))
		} else {
			return res.status(400).send({
				message: "Null shall\'t pass, check the data you are sending",
				message_code: 1003
			})
		}

	},

	update(req, res) {
		if (req.body.question != '' && req.body.question != null && req.body.userId != '' && req.body.userId != null && req.body.id != null) {
			return Question.findOne({
					where: {
						id: req.body.id
					}
				})
				.then(function (question_obj) {
					if (question_obj) {
						question_obj.updateAttributes({
								question: req.body.question,
								answer: req.body.answer
							}).then(updated_question => res.status(200).json({
								message: 'Question Updated Successfully',
								message_code: 1005
							}))
							.catch(err => res.status(400).json({
								message: 'Error during updating Question',
								message_code: 1006,
								err: err
							}))
					} else {
						return res.status(400).json({
							message: 'Invalid Question',
							message_code: 1007
						})
					}
				}).catch(err => res.status(400).json({
					message: 'Error during updating question',
					message_code: 1006,
					err: err
				}))
		} else {
			return res.status(400).send({
				message: "Null shall\'t pass, check the data you are sending",
				message_code: 1003
			})
		}

	},

	get(req, res) {
		return Question.findAll({
				attributes: ['id','question','read', 'answer','answered', 'createdAt'],
				include: {
					model: User,
					attributes: ['id', 'first_name', 'last_name', 'email']
				}
			}).then(question => res.status(200).json({
				questions: question,
				message_code: 1101,
				message: 'Question List'
			}))
			.catch(err => res.status(400).json({
				message_code: 1102,
				message: 'Error during getting list of questions',
				err: err
			}))
	},

	delete(req, res) {
		if (req.body.id != null) {
			return Question.destroy({
				where: {
					id: req.body.id
				}
			}).then(question => res.status(200).json({
				message_code: 1104,
				message: 'Question Deleted Successfully'
			})).catch(err =>
				res.status(400).json({
					message: 'Error during Deleting Question',
					err: err
				}))
		} else {
			return res.status(400).send({
				message: "Invalid Question",
				message_code: 1003
			})
		}

	},

	getUsersQuestion(req, res) {
		return User.findOne({
				where: {
					id: req.params.userId
				},
				include: {
					model: Question,
					attributes: ['id', 'question','read', 'answer','answered', 'createdAt']
				}
			}).then(user => res.status(200).json({
				message: 'List of questions',
				message_code: 1101,
				questions: user.Questions
			}))
			.catch(err => res.status(400).json({
				message_code: 1102,
				message: 'Error during getting list of questions',
				err: err
			}))
	},

answerTheQuestion(req, res){
	if (req.body.id != '' && req.body.id != null && req.body.answer != null && req.body.answer!='') {
	return Question.findOne({
					where: {
						id: req.body.id
					}
				}).then(function (question_obj) {
					if (question_obj) {
						question_obj.updateAttributes({
								answer: req.body.answer,
								answered:true,
								read:true
							}).then(function(updated_question){
								return User.findOne({where:{id:updated_question.userId}}).then(function(user){
									console.log('user email',user.email)
									console.log('user first',user.first_name)
									console.log('user last_name',user.last_name)
									var email = {
										from:'Talk Temple Staff, admin@talktemple.com',
										to: user.email,
										subject: 'Answer for your question at talk temple',
										text:'Hello '+user.first_name+', We are happy to answer you question.Question : '+updated_question.question+'Answer : '+req.body.answer,
										html: 'Hello '+user.first_name+',<br> We are happy to answer you question.<br><strong>Question : </strong>'+updated_question.question+'<br><strong>Answer : </strong>'+req.body.answer,
									};

									client.sendMail(email, function(err, info){
										if(err){
											console.log(err)
										}else{
											console.log('Message sent: ' + info);
										}
									})

									return res.status(200).json({
									message: 'Question Answered Successfully',
									message_code: 1005
								})


								}).catch(err=>res.status(400).json({
								message: 'Error during Sending Mail',
								message_code: 1006,
								err: err
							}))


							})


					}else {
						return res.status(404).json({
							message: 'Invalid Question',
							message_code: 1007
						})
					}
				}).catch(err => res.status(400).json({
					message: 'Error during updating question',
					message_code: 1006,
					err: err
				}))

	}else{

		return res.status(400).send({
				message: "Null shall\'t pass, check the data you are sending",
				message_code: 1003
			})
	}
},

markReadQuestion(req, res){
	return Question.findOne({where:{id:req.params.questionId}}).then(function(question){
		if(question){
			question.updateAttributes({
				read:true
			}).then(updated_question=>res.status(200).json({
				message:'Question Marked as Read',
				message_code: 1005
			})).catch(err=>res.status(400).json({
				message:'Error during updating question status',
				message_code:1006,
				err:err
			}))
		}else{
			return res.status(404).json({
				message:'Invalid Question',
				message_code:1007
			})
		}
	}).catch(err => res.status(400).json({
					message: 'Error during updating question',
					message_code: 1006,
					err: err
				}))
	},


unreadQuestion(req, res){
	return Question.findAll({
			where:{read:false},
			attributes:['id','question','read', 'answered', 'createdAt'],
			include:{
				model: User,
				attributes: ['id', 'first_name', 'last_name', 'email']
			}
			}).then(question=>res.status(200).json({
			question:question,
			message:'Unread questons',
			message_code: 1101
		})).catch(err=>res.status(400).json({message:'Error during getting Unread question', message_code:1102}))
},


getReadedQuestions(req, res){
	return Question.findAll({
		where:{read:true},
		attributes:['id','question','read', 'answered', 'createdAt'],
			include:{
				model: User,
				attributes: ['id', 'first_name', 'last_name', 'email']
			}
	}).then(question=>res.status(200).json({
			question:question,
			message:'Readed questons',
			message_code: 1101
		})).catch(err=>res.status(400).json({message:'Error during getting Readed question', message_code:1102}))
},




}
