Template.tags.helpers({
	tagUrl : function(){
		var currentTag = this.value;
	    return "/"+currentTag;
	}
})


Template.tags.events({
  'change .tagContainer' : function(e){
  var currentTags = e.val;
  if (!Tags.findOne({tag: currentTags[currentTags.length-1]}))
  {
    Tags.insert({tag: currentTags[currentTags.length-1]})
  }
  Projects.update(this._id, {$set:{tags: currentTags}});
  },
  'click .add-tag' : function(e, tmpl){
    console.log("clicked");
    console.log($(e.target).prev('.select2-container').find('.select2-input'))
    $(tmpl.find('.tagContainer')).select2('focus');
  }
})

Template.tags.rendered = function(){
  var savedTags = Tags.find().fetch();
  var arrayTags = []
  for (var i=0; i<savedTags.length;i++)
  {
    arrayTags.push(savedTags[i].tag)
  }
  $(".tagContainer").select2({
    tags:arrayTags,
    width:'auto'
    });

}