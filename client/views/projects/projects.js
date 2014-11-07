Session.setDefault("statusFilter", "In Progress");
Session.setDefault("priorityFilter", "Any" );
Session.setDefault("sort","Time Entered")

var notDone = ["In Progress", "Not Scheduled", "On Hold", ""]

Template.projects.projectList = function(){
    var statusFilter = Session.get('statusFilter');
    var priorityFilter = [Session.get('priorityFilter')];
    var sortBy;
    var order;
    switch(Session.get("sort")){
            case "Time Entered":
                sortBy = "time";
                order = -1;
                break;
            case "Name":
                sortBy = "name";
                order = 1;
                break;
            case "Date":
                sortBy = "date";
                order = -1
                break;
        }

    var mySort = {sort: {}};
    mySort.sort[sortBy] = order;

    if (priorityFilter.indexOf("Any") != -1)
    {
        priorityFilter = ["High Priority", "Low Priority", "", "Medium Priority", undefined];
    }
    if (statusFilter == 'All')
        return Projects.find({priority:{$in: priorityFilter}}, mySort);
    else if (statusFilter == "No Status")
        return Projects.find({status: ""});
    else if (statusFilter == 'Done')
    {
        return Projects.find({status: {$nin: notDone}, priority:{$in: priorityFilter}}, mySort)
    }
    else
       return Projects.find({status: statusFilter, priority: {$in: priorityFilter}}, mySort);
}


Template.imageList.images = function(){
    return Thumbnails.find();
}



Template.projectRow.events({
    'mouseenter .hoverable' : function(e, tmpl){
        var glyphicons = $(e.target).find(".glyphicon-edit");
        $(glyphicons).css("visibility","visible");
    },
    'mouseleave .hoverable' : function(e, tmpl){
        var glyphicons = $(e.target).find(".glyphicon-edit");
        $(glyphicons).css("visibility","hidden");
    },
    'click .parent':function(e, tmpl)
    {
        if (e.target.tagName){
        var x = $(tmpl.find('.details'));
        x.toggle()
        }
        if (x)
            x.toggle()    
    },
    'click .deleteProject':function(e, tmpl)
{
    var projectId = this._id;
    Meteor.call("deleteScreenshot", projectId);
    Projects.remove(this._id);
    Screenshots.remove(Screenshots.findOne({"metadata.projectId": projectId})._id);
    Thumbnails.remove(Thumbnails.findOne({"metadata.projectId": projectId})._id);
    SmallScreenshots.remove(Screenshots.findOne({"metadata.projectId": projectId})._id);


},
    'click .screenshotToggle' : function(e, tmpl)
    {
        var e = tmpl.find(".screenshotToggle");
        var enabled = e.checked;
        Projects.update(this._id, {$set:{screenshotEnabled: enabled}});
        var path = this.screenshotPath;
        if (path == undefined)
        {
            Meteor.call("getScreenshot", this.url, this._id)
        }

    },
    'click .refreshScreenshot' : function()
    {
        //check if thumbnail and screenshot exists and remove them from collection if true.
        var thumbnailObject = Thumbnails.findOne({"metadata.projectId": this._id});
        var screenshotObject = Screenshots.findOne({"metadata.projectId": this._id});
        if (thumbnailObject && screenshotObject)
        {
            Thumbnails.remove(thumbnailObject._id);
            Screenshots.remove(screenshotObject._id);
        }
        Meteor.call("getScreenshot", this.url,this._id);
    },
    'click .inline-edit .glyphicon-edit': function(e){
        toggleEdit(e);

    },
    'change .inline-edit': function(e){
        toggleEdit(e);
    },
    'change .inline-name': function(e){
        Projects.update(this._id, {$set:{name: e.target.value}});
    },
    'change .inline-description': function(e){
        Projects.update(this._id,{$set:{description: e.target.value}})
    },
    'change .inline-owner': function(e){
        Projects.update(this._id,{$set:{owner: e.target.value}})
    },
    'change .inline-url': function(e){
        Projects.update(this._id,{$set:{url: e.target.value}})
    },
    'change .inline-platform': function(e){
        Projects.update(this._id,{$set:{platform: e.target.value}})
    },
    'change .inline-type': function(e){
        Projects.update(this._id,{$set:{type: e.target.value}})
    },
    'change .inline-status': function(e){
        Projects.update(this._id,{$set:{status: e.target.value}})
    },
    'change .inline-priority': function(e){
        Projects.update(this._id,{$set:{priority: e.target.value}})
    },
    'change .inline-date': function(e){
        Projects.update(this._id, {$set:{date: e.target.value}});
    },
    'change .inline-notes' : function(e){
        Projects.update(this._id, {$set:{notes: e.target.value}});        
    },
    'focus .datepicker' : function(e){
        $(e.target).datepicker({
            autoclose : true
        });
    }
})

Template.projectRow.thumbnailPath = function(id){
    var newThumbnail = [Thumbnails.findOne({"metadata.projectId": id})];
    return newThumbnail;
}

Template.projectRow.imagePath = function(id){

    var newImage = [Screenshots.findOne({"metadata.projectId": id})];
    return newImage;


}

Template.tags.tagUrl = function(){
    var currentTag = this.value;
    return "/"+currentTag;
}

Template.projectRow.formattedUrl = function(){
    var url = this.url;
    if (!url)
    {
        return ""
    }
    if (url.substring(0,7) != "http://")
    {
        url = "http://" + url;
    }
    return url;
}



Template.filters.helpers({
    getStatusFilter : function(){
        return Session.get('statusFilter');
    },
    getPriorityFilter : function(){
        var priorityFilter = Session.get('priorityFilter');
        return priorityFilter;
    },
    getSort : function(){
        return Session.get('sort');
    },

})

Template.filters.events({
    'click .changeStatusFilter' : function(e){
        var newFilter = e.target.text;
        Session.set("statusFilter", newFilter);
    },
    'click .changePriorityFilter' : function(e){
        var newFilter = e.target.text;
        Session.set("priorityFilter", newFilter);
    },
    'click .changeSort' : function(e,tmpl){
        var newSort = e.target.text;
        Session.set("sort",newSort);
    }
})

// ESCAPE to collapse all rows.
$(document).keyup(function(e) {
  if (e.keyCode == 27) { 
    var details = document.getElementsByClassName("details");
    for (var i=0; i<details.length; i++)
    {
        $(details[i]).hide()
    }
  }   
});


Template.projects.rendered = function(){
    scrollToTop();
}


var scrollToTop = function(){
    $(document).ready(function() {
    $(window).scroll(function() {
        if($(this).scrollTop() > 100){
            $('#goTop').stop().animate({
                top: '20px'    
                }, 1000);
        }
        else{
            $('#goTop').stop().animate({
               top: '-100px'    
            }, 1000);
        }
    });
    $('#goTop').click(function() {
        $('html, body').stop().animate({
           scrollTop: 0
        }, 1000, function() {
           $('#goTop').stop().animate({
               top: '-100px'    
           }, 1000);
        });
    });
});    
}

