var appPath;

createThumbnail = function(screenshotPath, url, id){
	var Fiber = Npm.require("fibers")
	var im = Meteor.require("imagemagick")
	console.log(screenshotPath);
	im.convert([screenshotPath+".png", '-resize', '80x60', screenshotPath+"-small.png"], function(err, features){
  	if (err) throw err;
 		 console.log('Created thumbnail');
 	//insert images into Screenshots and Thumbnails DBs
 	Fiber(function(){
 		var newThumbnail = new FS.File(screenshotPath+"-small.png");
 		newThumbnail.metadata = {projectId: id, myUrl : url};
 		var newScreenshot = new FS.File(screenshotPath+".png");
 		newScreenshot.metadata = {projectId: id};
 		Thumbnails.insert(newThumbnail);
 		Screenshots.insert(newScreenshot);
	}).run();
	console.log("Images added succesfully");
 })
}


isAdmin = function(){
	var currentUser = Meteor.userId().username;
	console.log(currentUser);
	if (Admins.findOne({name: currentUser.username}))
		return true;
	else
		return false;
}


if (Meteor.isServer) {

	Meteor.publish('projects', function(){
		return Projects.find();
	})

	Projects.allow({
		'update': function(userId){
			if (Meteor.userId()){
				return true;}
		},
		'remove': function(userId){
			return true;
		}
	})


	Meteor.publish('images', function(){
		return Thumbnails.find();
	});

	Meteor.publish('screenshots', function(){
		return Screenshots.find();
	});

	Meteor.publish('admins', function(){
		return Admins.find();
	});

	Admins.allow({
		'update' : function(userId){
			if (isAdmin())
				return true;
		},
		'remove' : function(userId){
			if (isAdmin())
				return true;
		}
	})









//Initialize Variables:
	Meteor.startup(function(){
	process.chdir('../../../../../');
	appPath = process.cwd()+'/';
	});


//Run PhantomJS script to get screenshots. Screenshot stored as: ~/.screenshots/<id>/<YY/MM/DD>.png


Meteor.methods({
	getScreenshot : function(url, id, callback){
	var fs = Meteor.require('fs-extra');
	var Future = Npm.require('fibers/future');
	var imageDownloaded = false;
	var exec = Meteor.require('exec');
	var Fiber = Npm.require('fibers')
	var date = new Date();        
	var dateString = ( date.getFullYear().toString().substr(2,2) + "-" + (date.getMonth() + 1) + "-" + date.getDate());
	screenshotsPath = appPath+'.screenshots/',
	screenshotPath = screenshotsPath+  id +'/'+dateString;
    fs.mkdir(screenshotsPath+id, function(error) 
    {
  		//console.log(error);
	});
	console.log("Getting screenshots for: " + url);
    var date = new Date();   
    var screenshotPath = screenshotsPath+ id +'/'+dateString;
		exec(['phantomjs', appPath +'.scripts/' + 'screencapture.js', url, screenshotsPath+ id +'/'+dateString+'.png'], function(err, out, code) {
  		process.stderr.write(err);
  		process.stdout.write(out);
  		Fiber(function(){
  			createThumbnail(screenshotPath, url, id);
  		}).run();
	})
},
	refreshScreenshots : function(){
		var  URLs = Projects.find().fetch();
        for (var i=0; i<URLs.length; i++) {
        	var currentId = URLs[i]._id;
        	var currentUrl= URLs[i].url;
        	Projects.update(currentId, {$set:{time: "1"}});
        	Meteor.call("getScreenshot", currentUrl, URLs[i]._id);
        }

	}

/*
	findScreenshot : function(id)
	{
		//console.log(id);
		var date = new Date();        
    	var dateString = (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear().toString().substr(2,2);
    	var path = appPath+".screenshots/"+id+"/";
		var Finder = Meteor.require('fs-finder');
		try{
			var files = Finder.in(path).findFiles();
		}
		catch(err){
			Projects.update(id, {$set:{screenshotPath: ""}});
			return ;
		}
		if (files.length>0){
		screenshot = files[files.length-1].toString();
		var index = screenshot.indexOf("/.screenshots");
		screenshot = screenshot.substr(index);
        Projects.update(id, {$set:{screenshotPath: screenshot}});
    	}

	}
*/


}) //end Meteor Methods


}