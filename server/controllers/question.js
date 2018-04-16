const User = require('../models').User;
const Question = require('../models').Question;


module.exports = {
	create(req, res) {
		if (req.body.question != '' && req.body.question != null && req.body.userId != '' && req.body.userId != null) {
			return Question.create({
					question: req.body.question,
					userId: req.body.userId
				}).then(question => res.status(200).json({
					message: 'Question created Successfully',
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
				attributes: ['id', 'question', 'answer'],
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
					attributes: ['id', 'question', 'answer']
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
				})
				.then(function (question_obj) {
					if (question_obj) {
						question_obj.updateAttributes({
								answer: req.body.answer
							}).then(updated_question => res.status(200).json({
								message: 'Question Answered Successfully',
								message_code: 1005
							}))
							.catch(err => res.status(400).json({
								message: 'Error during saving Answer',
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

}


// Project.find({ where: { title: 'aProject' } })
//   .on('success', function (project) {
//     // Check if record exists in db
//     if (project) {
//       project.updateAttributes({
//         title: 'a very different title now'
//       })
//       .success(function () {})
//     }
//   })