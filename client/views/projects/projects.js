// set all inline edits to inline, and not popup.
$.fn.editable.defaults.mode = 'inline';
$.fn.editable.defaults.showbuttons = false;


Template.projects.projectList = function(){
	return Projects.find({},{sort:{time:-1}});
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
    },
    'click .editableName' : function(e, tmpl){
        var projectId = this._id;
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
            cols: 20,
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
            'click .editURL' : function(e, tmpl){
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
                    success: function(response, newValue){
                        Projects.update(projectId, {$set:{url: newValue}});
                    }
                    });
                }
                else{
                    URL = $(e.target)
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
