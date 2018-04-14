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

    //--------------------------Get songs--------------------------------
    getSongs(req, res) {
        return Song.findAll({
            attributes: ['id', 'title', 'song']
        }).then(songs => res.status(200).json({
            songs: songs,
            message_code: 1101,
            message: 'List of Songs'
        })).catch(err =>
            res.status(400).json({
                message: 'Error occured while Getting List of songs',
                message_code: 1102
            }))
    },

    //-------------------------------Update Song-------------------------
    updateSong(req, res){
        if(req.body.title != '' && req.body.title != null && req.body.song != '' && req.body.song != null && req.body.id){
            return Song.findOne({
                where:{id:req.body.id},
            }).then(function(song_obj){
                if(song_obj){
                    song_obj.updateAttributes({
                    song: req.body.song,
                    title: req.body.title
                }).then(updated_song=>res.status(200).json({
                        message: 'Song Updated Successfully',
                        message_code: 1005
                    })).catch(err=>res.status(400).json({
                        message: 'Error during updating Song',
                        message_code: 1006,
                        err: err
                    }))
                }else{
                    return res.status(400).json({
                            message: 'Invalid Song',
                            message_code: 1007
                        })
                }
                
            }).catch(err => res.status(400).json({
                    message: 'Error during updating Song',
                    message_code: 1006,
                    err: err
                }))
        }else {
            return res.status(400).send({
                message: "Null shall\'t pass, check the data you are sending",
                message_code: 1003
            })
        }

    },



    //-------------------------------Delete Songs-------------------------
    deleteSong(req, res) {
        return Song.destroy({
            where: {
                id: req.params.songId
            }
        }).then(song => res.status(200).json({
            message: 'Song Deleted Successfully',
            message_code: 1104
        })).catch(err =>
            res.status(400).json({
                message: "error While deleting song",
                message_code: 1103,
                error: err
            })
        )
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

    //--------------------------Get Video------------------------------------
    getVideo(req, res) {
        return Video.findAll({
            attributes: ['id', 'title', 'video']
        }).then(video => res.status(200).json({
            video: video,
            message: 'Video List',
            message_code: 1101
        })).catch(err =>
            res.status(200).json({
                message: 'Error occured during Getting List of Video',
                message_code: 1102
            }))
    },

    //------------------------Delete Video----------------------------------
    deleteVideo(req, res) {
        return Video.destroy({
                where: {
                    id: req.params.videoId
                }
            }).then(song => res.status(200).json({
                message: 'Video Deleted Successfully',
                message_code: 1104
            }))
            .catch(err => res.status(400).json({
                message: 'Error occured during deleting Video, Please try again',
                message_code: 1103
            }))
    },

    //-------------------------------Update Song-------------------------
    updateVideo(req, res){
        if(req.body.title != '' && req.body.title != null && req.body.video != '' && req.body.video != null && req.body.id){
            return Video.findOne({
                where:{id:req.body.id},
            }).then(function(video_obj){
                if(video_obj){
                    video_obj.updateAttributes({
                    video: req.body.video,
                    title: req.body.title
                }).then(updated_video=>res.status(200).json({
                        message: 'video Updated Successfully',
                        message_code: 1005
                    })).catch(err=>res.status(400).json({
                        message: 'Error during updating video',
                        message_code: 1006,
                        err: err
                    }))
                }else{
                    return res.status(400).json({
                            message: 'Invalid video',
                            message_code: 1007
                        })
                }
                
            }).catch(err => res.status(400).json({
                    message: 'Error during updating video',
                    message_code: 1006,
                    err: err
                }))
        }else {
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

    //--------------------Get Image List----------------------------------
    getImage(req, res) {
        return Image.findAll({
                attributes: ['id', 'image', 'title']
            }).then(image => res.status(200).json({
                message: 'Image List',
                image: image,
                message_code: 1101
            }))
            .catch(err => res.status(400).json({
                message: 'Error During Getting List of Images, try again',
                message_code: 1102
            }))
    },

    //---------------------Delete Images---------------------------------
    deleteImage(req, res) {
        return Image.destroy({
                where: {
                    id: req.params.imageId
                },
            }).then(image => res.status(200).json({
                message: 'Image Deleted Successfully',
                message_code: 1104
            }))
            .catch(err => res.status(400).json({
                message_code: 1103,
                message: 'Error occured during deleting image',
                err: err
            }))
    },


    //-------------------------------Update Song-------------------------
    updateImage(req, res){
        if(req.body.title != '' && req.body.title != null && req.body.image != '' && req.body.image != null && req.body.id){
            return Image.findOne({
                where:{id:req.body.id},
            }).then(function(image_obj){
                if(image_obj){
                    image_obj.updateAttributes({
                    image: req.body.image,
                    title: req.body.title
                }).then(updated_image=>res.status(200).json({
                        message: 'Image Updated Successfully',
                        message_code: 1005
                    })).catch(err=>res.status(400).json({
                        message: 'Error during updating Image',
                        message_code: 1006,
                        err: err
                    }))
                }else{
                    return res.status(400).json({
                            message: 'Invalid Image',
                            message_code: 1007
                        })
                }
                
            }).catch(err => res.status(400).json({
                    message: 'Error during updating Image',
                    message_code: 1006,
                    err: err
                }))
        }else {
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

    //--------------------------Get Thought--------------------------------
    getThought(req, res) {
        return Thought.findAll({
                attributes: ['id', 'title', 'thought', 'author']
            }).then(thought => res.status(200).json({
                message: 'Thought List',
                thought: thought,
                message_code: 1101
            }))
            .catch(err => res.status(400).json({
                message: 'error occured during Getting list of Thought, Please try again',
                message_code: 1102,
                err: err
            }))
    },

    //--------------------------Delete Thought--------------------------------
    deleteThought(req, res) {
        return Thought.destroy({
                where: {
                    id: req.params.thoughtId
                }
            }).then(thought => res.status(200).json({
                message: 'Thought Deleted Successfully',
                message_code: 1104
            }))
            .catch(err => res.status(400).json({
                message: 'Error occured during deleting image',
                message_code: 1103,
                err: err
            }))
    },

    //--------------------------Update Thought--------------------------------
    updateThought(req, res){
        if(req.body.title != '' && req.body.title != null && req.body.thought != '' && req.body.thought != null && req.body.id){
            return Thought.findOne({
                where:{id:req.body.id},
            }).then(function(thought_obj){
                if(thought_obj){
                    thought_obj.updateAttributes({
                    thought: req.body.thought,
                    title: req.body.title,
                    author:req.body.author
                }).then(thought_image=>res.status(200).json({
                        message: 'thought Updated Successfully',
                        message_code: 1005
                    })).catch(err=>res.status(400).json({
                        message: 'Error during updating thought',
                        message_code: 1006,
                        err: err
                    }))
                }else{
                    return res.status(400).json({
                            message: 'Invalid thought',
                            message_code: 1007
                        })
                }
                
            }).catch(err => res.status(400).json({
                    message: 'Error during updating thought',
                    message_code: 1006,
                    err: err
                }))
        }else {
            return res.status(400).send({
                message: "Null shall\'t pass, check the data you are sending",
                message_code: 1003
            })
        }

    },

    //-------------------------------Get All----------------------------
    getAll(req, res){
        return Thought.findAll({
                attributes: ['id', 'title', 'thought', 'author']
            }).then(function(thought){
              Song.findAll({
                    attributes: ['id', 'title', 'song']
                }).then(function(songs){

                    Video.findAll({
                        attributes: ['id', 'title', 'video']
                    }).then(function(video){

                        Image.findAll({
                            attributes: ['id', 'image', 'title']
                        }).then(image => res.status(200).json({
                            message: 'List',
                            image: image,
                            thought:thought,
                            songs: songs,
                            video:video,
                            message_code: 1101
                        }))
                        .catch(err => res.status(400).json({
                            message: 'Error During Getting List',
                            message_code: 1102
                        }))
                    }).catch(err =>
                        res.status(200).json({
                            message: 'Error During Getting List',
                            message_code: 1102
                        }))
                }).catch(err =>
                    res.status(400).json({
                        message: 'Error During Getting List',
                        message_code: 1102
                    }))
            })
            .catch(err => res.status(400).json({
                message: 'Error During Getting List, Please try again',
                message_code: 1102,
                err: err
            }))
            
    }



}