Template.projects.projectList = function(mySort){
	//return Projects.find({sort:{mySort:-1}});
    return Projects.find();
}


Template.projects.events({
    'click #screenShot' : function doScreenshot(){
        console.log("clicked screenshot");
        var  URLs = Projects.find().fetch();
        for (var i=0; i<URLs.length; i++) {
        var currentUrl= URLs[i].url;
        console.log(Meteor.call("getScreenshot", currentUrl, URLs[i]._id));
        console.log( currentUrl );
        }
    }
 })


Template.projectRow.events({
	'click .parent':function(e, tmpl)
	{
		var e = tmpl.find('.details');
        $(e).toggle();
	},
    'click .deleteProject':function(e, tmpl)
{
    Projects.remove(this._id);
}

})


Template.projectRow.imagePath = function(e, tpl){
	var url = this.url;
	if (url == '')
		return false;
    var date = new Date();        
    var dateString = (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear().toString().substr(2,2);
    var path = "/screenshots/"+this._id+"/"+dateString+".png";
    return path;
}


Template.projectRow.helpers({
    formattedUrl : function(e, tpl) {
        var url = this.url;
        if (this.url.substr(0,7) != "http://"){
            var url = "http://" + this.url;
            return url;
        } 
            return this.url;
    }
})







