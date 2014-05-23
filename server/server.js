var appPath;

createThumbnail = function(screenshotPath){
	im = Meteor.require("imagemagick")
	im.convert([screenshotPath+".png", '-resize', '80x60', screenshotPath+"-small.png"], function(err, features){
  	if (err) throw err;
 		 console.log('Created thumbnail');
	})
}





if (Meteor.isServer) {
//Set Collection Permissions:
	Projects.allow({
		'update': function(userId){
			return true;
		},
		'remove': function(userId){
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
  	createThumbnail(screenshotPath);
})
},

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
		var index = screenshot.indexOf("/screenshots");
		screenshot = screenshot.substr(index);
		console.log(screenshot);
        Projects.update(id, {$set:{screenshotPath: screenshot}});
    	}

	}


}) //end Meteor Methods


}

