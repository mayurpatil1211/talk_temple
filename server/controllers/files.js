const User = require('../models').User;
const Image = require('../models').Image;
const Video = require('../models').Video;
const Song = require('../models').Song;
const Thought = require('../models').Thought;

module.exports = {
    //--------------------------Add song Url--------------------------------

    song(req, res) {
        console.log(req.body)
        if (req.body.title != '' && req.body.title != null && req.body.song != '' && req.body.song != null) {
            return Song
                .create({
                    title: req.body.title,
                    song: req.body.song
                }).then(song => res.status(201).send({
                    message: "Song Added Successfully",
                    message_code: 1000
                }))
                .catch(error => res.status(400).send({
                    message: "Not able to Add Song, Please check Data",
                    message_code: 1001
                }))
        } else {
            return res.status(400).send({
                message: "Null shall\'t pass, check the data you are sending",
                message_code: 1003
            })
        }
    },

    //--------------------------Add video Url--------------------------------
    video(req, res) {
        console.log(req.body)
        if (req.body.title != '' && req.body.title != null && req.body.video != '' && req.body.video != null) {
            return Video
                .create({
                    title: req.body.title,
                    video: req.body.video
                }).then(video => res.status(201).send({
                    message: "Video Added Successfully",
                    message_code: 1000
                }))
                .catch(error => res.status(400).send({
                    message: "Not able to Add Video, Please check Data",
                    message_code: 1001
                }))
        } else {
            return res.status(400).send({
                message: "Null shall\'t pass, check the data you are sending",
                message_code: 1003
            })
        }
    },


    //--------------------------Add image Url--------------------------------
    image(req, res) {
        console.log(req.body)
        if (req.body.title != '' && req.body.title != null && req.body.image != '' && req.body.image != null) {
            return Image
                .create({
                    title: req.body.title,
                    image: req.body.image
                }).then(image => res.status(201).send({
                    message: "Image Added Successfully",
                    message_code: 1000
                }))
                .catch(error => res.status(400).send({
                    message: "Not able to Add Image, Please check Data",
                    message_code: 1001
                }))
        } else {
            return res.status(400).send({
                message: "Null shall\'t pass, check the data you are sending",
                message_code: 1003
            })
        }
    },

    //--------------------------Add Thought--------------------------------
    thought(req, res) {
        console.log(req.body)
        if (req.body.title != '' && req.body.title != null && req.body.thought != '' && req.body.thought != null) {
            return Thought
                .create({
                    title: req.body.title,
                    thought: req.body.thought,
                    author: req.body.author
                }).then(thought => res.status(201).send({
                    message: "Thought Added Successfully",
                    message_code: 1000
                }))
                .catch(error => res.status(400).send({
                    message: "Not able to Add Thought, Please check Data",
                    message_code: 1001
                }))
        } else {
            return res.status(400).send({
                message: "Null shall\'t pass, check the data you are sending",
                message_code: 1003
            })
        }
    },


    //-----------------------Add Fav Song--------------------------
    addfavSong(req, res) {
        console.log(req.body)
        return User.findOne({
                where: {
                    id: req.params.userId
                }
            }).then(function (user) {
                return user.addSongs(req.body.song).then(song =>
                    res.status(200).json({
                        message: 'Song Added to the Favorite',
                        message_code: 1201
                    })).catch(err =>
                    res.status(200).json({
                        message: 'Song cannot add to the Favorite',
                        message_code: 1202
                    }))
            })
            .catch(error => res.status(400).send({
                message: "Not able to Add Song to The Favorite, Please check Data",
                message_code: 1202
            }))

    },
    //-------------------Get List of Fav Song------------------------
    getFavSong(req, res) {
        return User.findOne({
            where: {
                id: req.params.userId
            },
            include: [{
                model: Song,
                attributes: {
                    include: ['id', 'song', 'title'],
                    exclude: ['updatedAt', 'createdAt', 'users_songs']
                },
                through: {
                    attributes: []
                }
            }]
        }).then(user =>
            res.json({
                'songs': user.Songs,
                message_code: 1204
            })
        ).catch(err =>
            res.status(400).json({
                message: 'cannot get Favorite songs, Please try again letter',
                message_code: 1203
            })
        )
    },
    //-------------------Remove Fav Song------------------------
    removeFavSong(req, res) {
        console.log(req.body)
        return User.findOne({
                where: {
                    id: req.params.userId
                }
            }).then(function (user) {
                return user.removeSongs(req.body.song).then(song =>
                    res.status(200).json({
                        message: 'Song Removed from the Favorite',
                        message_code: 1205
                    })).catch(err =>
                    res.status(200).json({
                        message: 'Song cannot be removed from the Favorite',
                        message_code: 1206
                    }))
            })
            .catch(error => res.status(400).send({
                message: "Not able to Remove Song from The Favorite, Please try again",
                message_code: 1207
            }))
    },


    //-----------------------Add Fav Video--------------------------
    addfavVideo(req, res) {
        console.log(req.body)
        if (req.body.video != null) {
            return User.findOne({
                    where: {
                        id: req.params.userId
                    }
                }).then(function (user) {
                    return user.addVideos(req.body.video).then(video =>
                        res.status(200).json({
                            message: 'Video Added to the Favorite',
                            message_code: 1201
                        })).catch(err =>
                        res.status(400).json({
                            message: 'Video cannot add to the Favorite',
                            message_code: 1202,
                            err: err
                        }))
                })
                .catch(err => res.status(400).send({
                    message: "Not able to Add Video to The Favorite, Please check Data",
                    message_code: 1202,
                    err: err
                }))
        } else {
            return res.status(400).json({
                message: 'Invalid Video',
                message_code: 1003
            })
        }


    },
    //----------------------Get fav video--------------------------
    getFavVideo(req, res) {
        return User.findOne({
                where: {
                    id: req.params.userId
                },
                include: [{
                    model: Video,
                    attributes: {
                        include: ['id', 'video', 'title'],
                        exclude: ['updatedAt', 'createdAt', 'users_videos']
                    },
                    through: {
                        attributes: []
                    }
                }]
            })
            .then(user =>
                res.json({
                    'videos': user.Videos,
                    message_code: 1204
                })
            )
            .catch(err =>
                res.status(400).json({
                    message: 'cannot get Favorite songs, Please try again letter',
                    message_code: 1203,
                    err: err
                })

            )
    },

    //-------------------Remove Fav Video--------------------------
    removeFavVideo(req, res) {
        if (req.body.video != null) {
            return User.findOne({
                where: {
                    id: req.params.userId
                },
            }).then(user => user.removeVideos(req.body.video).then(video => res.status(200)
                .json({
                    message: 'Video Removed From Favorite',
                    message_code: 1205
                }).catch(err => res.status(400).json({
                    message: 'Video Cannot be removed from Favorite',
                    message_code: 1206,
                    err: err
                }))
            )).catch(err => res.status(400).json({
                message: "Not able to Remove Song from The Favorite, Please try again",
                message_code: 1207,
                err: err
            }))
        } else {
            return res.status(400).json({
                message: 'Invalid Video',
                message_code: 1003
            })
        }
    },


    //----------------Add Image to the Fav------------------

    addFavImage(req, res) {
        if (req.body.image != null) {
            return User.findOne({
                where: {
                    id: req.params.userId
                },
            }).then(user =>
                user.addImages(req.body.image).then(image =>
                    res.status(200).json({
                        message: 'Image Added To the Favorite',
                        message_code: 1201
                    })).catch(err => res.status(400).json({
                    message_code: 1202,
                    message: 'Image Cannot Be Added to the Favorite',
                    err: err
                }))
            ).catch(err => res.status(400).json({
                message_code: 1202,
                message: "Not able to Add Image to The Favorite, Please check Data",
                err: err
            }))
        } else {
            return res.status(400).json({
                message: 'Invalid Image',
                message_code: 1003
            })
        }
    },

    //----------------Get Fav Image ------------------
    getFavImage(req, res) {
        return User.findOne({
            where: {
                id: req.params.userId
            },
            include: [{
                model: Image,
                attributes: {
                    include: ['id', 'image', 'title'],
                    exclude: ['updatedAt', 'createdAt', 'users_images']
                },
                through: {
                    attributes: []
                }
            }]
        }).then(user => res.status(200).json({
            images: user.Images,
            message_code: 1204
        })).catch(err => res.status(200).json({
            message: 'cannot get Favorite images, Please try again letter',
            message_code: 1203,
            err: err
        }))
    },

    //-----------------Remove Fav Images-------------
    removeFavImage(req, res) {
        if (req.body.image != null) {
            return User.findOne({
                where: {
                    id: req.params.userId
                },
            }).then(user => user.removeImages(req.body.image).then(image => res.status(200).json({
                message: 'Removed Image from Favorite',
                message_code: 1205
            })).catch(err => res.status(400).json({
                message: "Cannot Remove Image From Favorite, at this movement",
                message_code: 1206
            }))).catch(err => res.status(400).json({
                message: "Not able to Remove Image from The Favorite, Please try again",
                message_code: 1207,
                err: err
            }))
        } else {
            return res.status(400).json({
                message: 'Invalid Image',
                message_code: 1003
            })
        }
    },


    //-----------Add Fav Thought----------------
    addfavThought(req, res) {
        if (req.body.thought != null) {
            return User.findOne({
                where: {
                    id: req.params.userId
                },
            }).then(user =>
                user.addThoughts(req.body.thought).then(thought =>
                    res.status(200).json({
                        message: 'Thought Added to the Favorite',
                        message_code: 1201
                    })
                ).catch(err => res.status(400).json({
                    message: "Thought could not added to the Favorite",
                    message_code: 1202,
                    err: err
                }))
            ).catch(err => res.status(400).json({
                message_code: 1202,
                message: 'Not able to Add Thought to The Favorite, Please check Data',
                err: err
            }))
        }
    },

    //---------Get Fav Thought--------------------
    getFavThought(req, res) {
        return User.findOne({
                where: {
                    id: req.params.userId
                },
                include: [{
                    model: Thought,
                    attributes: {
                        include: ['id', 'thought', 'title', 'author'],
                        exclude: ['updatedAt', 'createdAt', 'users_thoughts']
                    },
                    through: {
                        attributes: []
                    }
                }]
            }).then(user => res.status(200).json({
                thoughts: user.Thoughts,
                message_code: 1204
            }))
            .catch(err => res.status(400).json({
                message_code: 1203,
                message: "cannot get Favorite Thoughts, Please try again letter"
            }))
    },

    //-----------------Remove Fav Thought-------------
    removeFavThought(req, res) {
        if (req.body.thought != null) {
            return User.findOne({
                where: {
                    id: req.params.userId
                },
            }).then(user => user.removeThoughts(req.body.image).then(thought => res.status(200).json({
                message: 'Removed Thought from Favorite',
                message_code: 1205
            })).catch(err => res.status(400).json({
                message: "Cannot Remove Thought From Favorite, at this movement",
                message_code: 1206
            }))).catch(err => res.status(400).json({
                message: "Not able to Remove Thought from The Favorite, Please try again",
                message_code: 1207,
                err: err
            }))
        } else {
            return res.status(400).json({
                message: 'Invalid Thought',
                message_code: 1003
            })
        }
    },


}