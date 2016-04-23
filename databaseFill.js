var mongoose = require('mongoose');
var request = require('request');
var Promise = require('bluebird');
var operations = require('./databaseOperations')
mongoose.connect('mongodb://localhost/local');

var showSchema,
	User,
	Show ;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongo connected')


showSchema = require('./models/Show.js').showSchema ;

User = mongoose.model('User',userSchema)
Show = mongoose.model('Show', showSchema);


operations.getAllShowIds()
	.then(function(showIds){
		
		Promise.each(showIds,function(element){
			 
				return (operations.getAllEpisodes(element.showId).then(function(result){
					operations.addAllEpisodes(result.episodes,result.showId);
				}))
			
		})
	})
});