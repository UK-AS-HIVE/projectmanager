Template.tags.helpers({
	tagUrl : function(){
		var currentTag = this.value;
	    return "/"+currentTag;
	},
  currentTags : function(){
    return Projects.findOne(this._id).tags;
    console.log(myTags);
    if (!myTags){
      return null;
    }
    var tags = myTags[0];
    for (var i=1; i<myTags.length;i++)
    {
      tags = tags + "," + myTags[i];
    }
    return tags;
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
  }
})

Template.tags.rendered = function(){

  var savedTags = Tags.find().fetch();
  var arrayTags = []
  for (var i=0; i<savedTags.length;i++)
  {
    arrayTags.push(savedTags[i].tag)
  }
  console.log(arrayTags);
  $(".tagContainer").select2({
    tags:arrayTags,
    width: '200px',
  });

}