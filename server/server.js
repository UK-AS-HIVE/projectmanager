var appPath;

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
	var Future = Npm.require('fibers/future');
	var exec = Meteor.require('exec');
	screenshotsPath = appPath+'public'+'/screenshots/',
	myFuture = new Future();
    fs.mkdir(screenshotsPath+id, function(error) 
    {
  		//console.log(error);
	});
	console.log("Getting screenshots for: " + url);
    var date = new Date();        
    var dateString = ( date.getFullYear().toString().substr(2,2) + "-" + (date.getMonth() + 1) + "-" + date.getDate());
    console.log(appPath+'phantomjs');
	exec([appPath +'phantomjs', appPath +'.scripts/' + 'screencapture.js', url, screenshotsPath+ id +'/'+dateString+'.png'], function(err, out, code) {
  	if (err instanceof Error)
    throw err;
  	process.stderr.write(err);
  	process.stdout.write(out);
	});
	console.log("done");
	return myFuture;
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