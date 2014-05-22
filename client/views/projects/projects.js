// set all inline edits to inline, and not popup.
$.fn.editable.defaults.mode = 'inline';
$.fn.editable.defaults.showbuttons = false;

Session.setDefault("filterBy", "In Progress" )

var notDone = ["In Progress", "Not Scheduled", "On Hold", ""]

Template.projects.projectList = function(){
    var filterBy = Session.get('filterBy');
    if (filterBy == 'All')
        return Projects.find();
    else if (filterBy == "No Status")
        return Projects.find({status: ""});
    else if (filterBy == 'Done')
    {
        return Projects.find({status: {$nin: notDone}})
    }
    else
	   return Projects.find({status: filterBy});
}





Template.projects.events({
    'click .editableName' : function(e, tmpl){
        var projectId = this._id;
        console.log(projectId);
        $(e.target).editable({
        type: 'text',
        success: function(response, newValue){
            Projects.update(projectId, {$set:{name: newValue}});
        }
    });
        $(e.target).editable('show');
    },
        'click .editableStatus' : function(e, tmpl){
        var projectId = this._id;
        var currentStatus = e.target.text;
        $(e.target).editable({
        type: 'select',
        show:true, 
        value: currentStatus,  
        showbuttons: false,
        source: [
          {value: 'In Progress', text: 'In Progress'},
          {value: 'Not Scheduled', text: 'Not Scheduled'},
          {value: 'On Hold', text: 'On Hold'},
          {value: 'Done', text: 'Done'}
       ],
        success: function(response, newValue) {
            Projects.update(projectId, {$set:{status: newValue}});

    }
    });
        $(e.target).editable('show');

    },
        'click .editableDescription' : function(e, tmpl){
        var projectId = this._id;
        var currentDescription = e.target.text;
        if (currentDescription=="Enter a Description")
        {
            currentDescription = ''
        }
        $(e.target).editable({
            type: 'textarea',
            value : currentDescription,
            showbuttons:true,
            width: 200,
            rows: 3,
            success: function(response, newValue) {
                Projects.update(projectId, {$set:{description: newValue}});
            }
            });
            $(e.target).editable('show');
    },
        'click .editableOwner' : function(e, tmpl){
        var projectId = this._id;
        var currentOwner = e.target.text;
        console.log(currentOwner);
        if (currentOwner=="No Owner")
        {
            currentOwner = '';
        }
        $(e.target).editable({
            type: 'text',
            value: currentOwner,
            success: function(response, newValue) {
                Projects.update(projectId, {$set:{owner: newValue}});
            }
            });
            $(e.target).editable('show');
    },
        'click .editablePlatform' : function(e, tmpl){
            var projectId = this._id;
            var currentPlatform = e.target.text;
            if (currentPlatform=="Add Platform")
            {
                currentPlatform = '';
            }
            $(e.target).editable({
                type: 'text',
                value: currentPlatform,
                success: function(response, newValue) {
                    Projects.update(projectId, {$set:{platform: newValue}});
                }
                });
                $(e.target).editable('show');
    },
            'click .editableType' : function(e, tmpl){
            var projectId = this._id;
            var currentType = e.target.text;
            if (currentType=="Add Platform")
            {
                currentType = '';
            }
            $(e.target).editable({
                type: 'text',
                value: currentType,
                success: function(response, newValue) {
                    Projects.update(projectId, {$set:{type: newValue}});
                }
                });
                $(e.target).editable('show');
    },

        'click .editablePriority' : function(e, tmpl){
            var projectId = this._id;
            var currentPriority = e.target.text;
            $(e.target).editable({
            type: 'select',
            show:true, 
            value: currentPriority,  
            showbuttons: false,
            source: [
              {value: 'Low Priority', text: 'Low Priority'},
              {value: 'High Priority', text: 'High Priority'}
           ],
            success: function(response, newValue) {
                Projects.update(projectId, {$set:{priority: newValue}});
            }
    });
        $(e.target).editable('show');

     },

        'click .editableDate' : function(e, tmpl){
            var projectId = this._id;
            var currentDate = e.target.text;
            $(e.target).editable({
                    format: 'mm-dd-yyyy',    
                    viewformat: 'mm/dd/yyyy',    
                    datepicker: {format: "mm/dd/yyyy",
                                    weekStart: 1, autoclose:true},
                    success : function(response, newValue) {
                        Projects.update(proejctId,{$set:{date:newValue}});
                }
            });
            $(e.target).editable("show");
        },
        'click .editableNotes' : function(e, tmpl){
            var projectId = this._id;
            var currentNotes = e.target.text;
            if (currentNotes=="Add Notes")
            {
                currentNotes = '';
            }
            $(e.target).editable({
                type: 'textarea',
                value : currentNotes,
                showbuttons:true,
                cols: 20,
                rows: 3,
                success: function(response, newValue) {
                    Projects.update(projectId, {$set:{notes: newValue}});
                }
                });
                $(e.target).editable('show');
            },
            'click .addTag' : function(e, tmpl){
                var projectId = this._id;
                $(e.target).editable({
                    value: '', // need to make value always blank
                    deftaulValue: '',
                    display:false,
                    success: function(response, newValue){
                        var tags = Projects.findOne(projectId).tags;
                        if (tags == undefined){
                           var tags = [newValue];
                        }
                        else{
                            tags.push(newValue);
                        }
                        Projects.update(projectId, {$set:{tags: tags}});

                    }
                });
                $(e.target).editable('show');
            },

            'click .editURL' : function(e, tmpl){
                console.log("clicked");
                e.preventDefault();
                e.stopPropagation();
                var projectId = this._id;
                var currentURL = this.url;
                if (currentURL!=''){
                    URL = $(e.target).closest('td').find('.editableURL');
                    $(URL).editable({
                    type: 'text', 
                    value: currentURL,  
                    showbuttons: false,
                    inputclass:'URLinput',
                    success: function(response, newValue){
                        Projects.update(projectId, {$set:{url: newValue}});
                        Meteor.call("getScreenshot", newValue, projectId);

                    }
                    });
                }
                if (!currentURL){
                    URL = $(e.target);
                    $(URL).editable({
                        type: 'text', 
                        value: "http://",  
                        showbuttons: false,
                        success: function(response, newValue) {
                            Projects.update(projectId, {$set:{url: newValue}});
                        }
                        });
                    }
                (URL).editable('toggle');
                (URL).off('click');

        },
        'click .deleteTag': function(e, tmpl){
            var projectId = $(e.target).closest('td').attr('id').toString().substr(5);
            console.log(projectId);
            var currentTag = this.toString();
            console.log(currentTag);
            Projects.update( projectId , {"$pull": { "tags" : currentTag}});



        }

 })


Template.projectRow.events({
	'click .parent':function(e, tmpl)
	{
        var element = e.target.tagName;
        if (element == 'TD'){
		var e = tmpl.find('.details');
        $(e).toggle();
    }
    
	},
    'click .deleteProject':function(e, tmpl)
{
    Meteor.call("deleteScreenshot", this._id);
    Projects.remove(this._id);
},
    'click .screenshotToggle' : function(e, tmpl)
    {
        var e = tmpl.find(".screenshotToggle");
        var enabled = e.checked;
        console.log(enabled);
        Projects.update(this._id, {$set:{screenshotEnabled: enabled}});
        var path = this.screenshotPath;
        console.log(path);
        if (path == undefined)
        {
            Meteor.call("getScreenshot", this.url, this._id)
        }

    }

})

Template.projectRow.imagePath = function(){
    Meteor.call("findScreenshot", this._id);
    var path = this.screenshotPath;
    if (path){
    path = path.substr(0, path.lastIndexOf('.'))
    return path;
    }
    return "";
}

Template.projectRow.validImage = function(){
    return false;
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
    getFilterBy : function(){
        return Session.get('filterBy');
    }

})

Template.filters.events({
    'click .changeFilter' : function(e){
        var newFilter = e.target.text;
        Session.set("filterBy", newFilter);
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
