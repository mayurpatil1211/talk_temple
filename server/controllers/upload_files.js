var jwt = require('jsonwebtoken');
const Image = require('../models').Image;
const Video = require('../models').Video;
const Song = require('../models').Song;
var secrete = 'talk_temple_codematrix'
var path = require('path')
var multer  = require('multer')


//-------------Image

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, path.join(__dirname+ '/public/uploads/images/'))
    cb(null, './uploads/images')
  },
  filename: function (req, file, cb) {
  	if(!file.originalname.match(/\.(jpeg|jpg|png|gif)$/)){
  		var err = new Error();
  		err.code = 'filetype';
  		return cb(err);
  	}else{
  		var assigned_filename = Date.now()+ '_' +file.originalname
  			Image.create({title: req.body.title, image:'/images/'+String(assigned_filename)})
  			.then(image=>next())
  			.catch(err=>cb(err))
  		cb(null, assigned_filename)
  	}
  }
})
 
var upload = multer({ 
	storage: storage,
	limits: {fileSize:10000000}}).single('imgFile')


//-------------Video
var storageVideo = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, path.join(__dirname+ '/public/uploads/images/'))
    cb(null, './uploads/video')
  },
  filename: function (req, file, cb) {
  	if(!file.originalname.match(/\.(mp4|mkv|gif|webp|avi|m4v|3gp|mpg|mpeg|m4p|wmv)$/)){
  		var err = new Error();
  		err.code = 'filetype';
  		return cb(err);
  	}else{
  		var assigned_filename = Date.now()+ '_' +file.originalname
  			Video.create({title: req.body.title, video:'/video/'+assigned_filename})
  			.then(image=>next())
  			.catch(err=>cb(err))
  		cb(null, assigned_filename)
  	}
  }
})
 
var uploadVideo = multer({ 
	storage: storageVideo,
	}).single('videoFile')

//-------------Song
var storageSong = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, path.join(__dirname+ '/public/uploads/images/'))
    cb(null, './uploads/songs')
  },
  filename: function (req, file, cb) {
  	if(!file.originalname.match(/\.(mp3|mpc|m4a|msv|3gp|aac|vox)$/)){
  		var err = new Error();
  		err.code = 'filetype';
  		return cb(err);
  	}else{
  		var assigned_filename = Date.now()+ '_' +file.originalname
  			Song.create({title: req.body.title, song:'/songs/'+assigned_filename})
  			.then(image=>next())
  			.catch(err=>cb(err))
  		cb(null, assigned_filename)
  	}
  }
})
 
var uploadSongs = multer({ 
	storage: storageSong,
	limits: {fileSize:50000000}
	}).single('songFile')



//------------------API
module.exports = (app)=>{
	app.post('/api/upload-image', function (req, res) {
		
	  upload(req, res, function (err) {
	    if (err) {
	      if(err.code==='LIMIT_FILE_SIZE'){
	      	res.json({success:false, message: 'Image size is too large', message_code:1103})
	      }else if(err.code==='filetype'){
	      	re.json({success:false, message:'Image type is invalid. Must be .png or .jpeg or .jpg', message_code:1104})
	      }else{
	      	console.log(err)
	      	res.json({success:false, message:'Image was not able to be uploaded', message_code:1102})
	      }
	    }else{
	    	if(!req.file){
	    		res.json({success:false, message:'No file was selected', message_code:1105})
	    	}else{
	    		res.json({success:true, message:'Image was uploaded', message_code:1101})
	    	}
	    }
	  
	  })
	}),


//-------------Video
	app.post('/api/upload-video', function (req, res) {
		
	  uploadVideo(req, res, function (err) {
	    if (err) {
	      if(err.code==='LIMIT_FILE_SIZE'){
	      	res.json({success:false, message: 'Video size is too large', message_code:1103})
	      }else if(err.code==='filetype'){
	      	re.json({success:false, message:'Video type is invalid.', message_code:1104})
	      }else{
	      	console.log(err)
	      	res.json({success:false, message:'Video was not able to be uploaded', message_code:1102})
	      }
	    }else{
	    	if(!req.file){
	    		res.json({success:false, message:'No file was selected', message_code:1105})
	    	}else{
	    		res.json({success:true, message:'Video was uploaded', message_code:1101})
	    	}
	    }
	  
	  })
	}),


//-------------Songs
app.post('/api/upload-song', function (req, res) {
		
	  uploadSongs(req, res, function (err) {
	    if (err) {
	      if(err.code==='LIMIT_FILE_SIZE'){
	      	res.json({success:false, message: 'Song size is too large', message_code:1103})
	      }else if(err.code==='filetype'){
	      	res.json({success:false, message:'Song type is invalid.', message_code:1104})
	      }else{
	      	console.log(err)
	      	res.json({success:false, message:'Song was not able to be uploaded', message_code:1102})
	      }
	    }else{
	    	if(!req.file){
	    		res.json({success:false, message:'No file was selected', message_code:1105})
	    	}else{
	    		res.json({success:true, message:'Song was uploaded', message_code:1101})
	    	}
	    }
	  
	  })
	})



};


