var appPath;

if (Meteor.isServer) {
	//get the current meteor app path.
	Meteor.startup(function(){
	process.chdir('../../../../../');
	appPath = process.cwd()+'/';
	})





	Meteor.methods({
	//get a screenshot given a url, and an id for the project to be placed in.
	getScreenshot : function(url, id){
	//var Future = Npm.require('fibers/future');
	var exec = Npm.require('exec');
	var fs = Npm.require('fs'),
	screenshotsPath = appPath+'public'+'/screenshots/'
    fs.mkdir(screenshotsPath+id, function(error) 
    {
  		//console.log(error);
	});
	console.log("Getting screenshots for: " + url);
    var date = new Date();        
    var dateString = (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear().toString().substr(2,2);
	exec([appPath +'phantomjs', appPath +'.scripts/' + 'screencapture.js', url, screenshotsPath+ id +'/'+dateString+'.png'], function(err, out, code) {
  	if (err instanceof Error)
    throw err;
  	process.stderr.write(err);
  	process.stdout.write(out);
	});

	}

})

}







    // code to run on server 