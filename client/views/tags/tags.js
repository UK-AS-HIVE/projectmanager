Template.tags.helpers({
	tagUrl : function(){
		var currentTag = this.value;
	    return "/"+currentTag;
	}
})


Template.tags.events({
  'click .remove-tag-btn' : function(e, tmpl){
    var projectId = e.target.getAttribute('data-projectId');
    var tag = e.target.getAttribute('data-tag-content');
    Projects.update(projectId, {$pull: {tags: tag}})
  },
  'click .toggle-tag': function(e){
    $(e.target).next().toggle()
  },
  'change .tag-input': function(e){
    if (e.target.value){
      Projects.update(this._id, {$push:{tags: e.target.value}});
    }
    if (Tags.find({tag: e.target.value}).count() == 0){
      Tags.insert({tag: e.target.value})
    }
    e.target.value = "";
    $(e.target).select2("val", null);
  },
  'click .glyphicon-edit': function(){
    $(".select2-input").focus()
  }
})

Template.tags.rendered = function(){
  $('.tag-div').toggle('')
  var savedTags = Tags.find().fetch();
  var arrayTags = []
  for (var i=0; i<savedTags.length;i++)
  {
    arrayTags.push(savedTags[i].tag)
  }
  $(".tag-input").select2({
    tags:arrayTags,
    containerCssClass: 'tag-container'
  });

}