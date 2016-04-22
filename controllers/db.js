var User = require('../models/User');
var Show = require('../models/Show');
var mongoose = require('mongoose')
var Promise = require('bluebird');
Promise.promisifyAll(User);
Promise.promisifyAll(Show);


exports.postSubscribe = function(req, res, next) {

/*Promise.each({
			
  show : */	
  			var showId;
  			var userId;
  			var index;

  			Show.
  			findOne().
  			where('showId').equals(parseInt(req.body.showId)).
  			exec(function(err,show){
  				if(!err && show){
  				 userId = mongoose.Types.ObjectId(req.user._id);
 				 showId = mongoose.Types.ObjectId(show._id);

 				 index = req.user.series.indexOf(show._id);
 				 
 				if(index == -1){
	  				show.subscribers.push(userId);
	  				
			    	show.save(function(err) {
			      		if (err) return next(err);
			       	});	
  				}	
  			}		
		    
		  	}).then(function(){
		  		if(index == -1 && showId){
		  			
		  			req.user.series.push(showId);
		 			req.user.save(function(err) {
			      		if (err) return next(err)
			    		res.send(200)	
			    	})
		  	
		  	}else
		  	res.end('didnt write to database')	
		});
};



exports.postUnsubscribe = function(req, res, next) {
   
Promise.props({

  show : 	Show.
  			findOne().
  			where('showId').equals(parseInt(req.body.showId)).
  			exec(function(err,show){
  			var index = show.subscribers.indexOf(req.user._id);

  			show.subscribers.splice(index,1);
		   	show.save(function(err) {
		      		if (err) return next(err);
		    	});
		  	}),

  user :   User.findOne(req.user._id , function(err,user){
		  	if (err) return next(err);
		  	var index = user.series.indexOf(req.body.showId);
		  	console.log('----------index------',index)
  			user.series.splice(index,1);
		  	user.save(function(err) {
		      if (err) return next(err);
		    });
		  })
	}).then(function(results){
			res.send(200);
	})
};

