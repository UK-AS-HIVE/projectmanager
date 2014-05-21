var appPath;
fetchScreenshot = function(url, id)
	{
	var Future = Npm.require('fibers/future');
	var exec = Meteor.require('exec');
	var date = new Date();        
	var dateString = ( date.getFullYear().toString().substr(2,2) + "-" + (date.getMonth() + 1) + "-" + date.getDate());
	screenshotsPath = appPath+'public'+'/screenshots/',
	screenshotPath = screenshotsPath+  id +'/'+dateString;
    fs.mkdir(screenshotsPath+id, function(error) 
    {
  		//console.log(error);
	});
	myFuture = new Future();
	console.log("Getting screenshots for: " + url);
    var date = new Date();        
	exec(['phantomjs', appPath +'.scripts/' + 'screencapture.js', url, screenshotsPath+ id +'/'+dateString+'.png'], function(err, out, code) {
  	if (err instanceof Error)
    	throw err;
  	process.stderr.write(err);
  	process.stdout.write(out);
  	myFuture.return(console.log("Done!"))
	});
	return myFuture.wait();

}


createThumbnail = function(screenshotPath){

	im = Meteor.require("imagemagick")
	im.convert([screenshotPath+".png", '-resize', '80x60', screenshotPath+"-small.png"], function(err, features){
  	if (err) throw err;
 		 console.log('Created thumbnail');
	})
	}


if (Meteor.isServer) {
	Projects.allow({
		'update': function(userId){
			return true;
		},
		'remove': function(userId){
			return true;
		}
	})


	//get the current meteor app path.
	Meteor.startup(function(){
	process.chdir('../../../../../');
	appPath = process.cwd()+'/';
	})
	var fs = Meteor.require('fs-extra');


	Meteor.methods({
	//get a screenshot given a url, and an id for the project to be placed in.




	getScreenshot : function(url, id){
		fetchScreenshot(url,id);
		var date = new Date();        
		var dateString = ( date.getFullYear().toString().substr(2,2) + "-" + (date.getMonth() + 1) + "-" + date.getDate());
		screenshotPath = appPath+'public'+'/screenshots/'+  id +'/'+dateString;
		createThumbnail(screenshotPath);
	},

	deleteScreenshot : function(id){
		fs.remove(appPath + 'public' + '/screenshots/' + id, function (err) {
  			if (err) {
    					console.error(err);
  					}
		});
	},


	findScreenshot : function(id)
	{
		//console.log(id);
		var date = new Date();        
    	var dateString = (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear().toString().substr(2,2);
    	var path = appPath+"public/screenshots/"+id+"/";
		var Finder = Meteor.require('fs-finder');
		var files = Finder.in(path).findFiles();
		if (files.length>0){
		screenshot = files[files.length-1].toString();
		var index = screenshot.indexOf("/screenshots");
		screenshot = screenshot.substr(index);
        Projects.update(id, {$set:{screenshotPath: screenshot}});
    	}

	}

})

}







    // code to run on server 