Template.tags.helpers({
	tagUrl : function(){
		var currentTag = this.value;
	    return "/"+currentTag;
	}
})


Template.tags.events({
	'click .deleteTag': function(e, tmpl){
		var currentTag = this.toString();
		var projectId = e.target.getAttribute('data-projectId');
		Projects.update( projectId , {"$pull": { "tags" : currentTag}});
		}

})