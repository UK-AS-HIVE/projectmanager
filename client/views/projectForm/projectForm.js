Template.projectForm.events({
    'click #addProjectBtn': function(){

        //toggle_visibility('projectForm');
        $('#responsive').modal('toggle');
    },

    'click #screenShot' : function doScreenshot(){
        console.log("clicked screenshot");
        var  URLs = Projects.find().fetch();
        for (var i=0; i<URLs.length; i++) {
        var currentUrl= URLs[i].url;
        console.log(Meteor.call("getScreenshot", currentUrl, URLs[i]._id));
        console.log( currentUrl );
        }
    },
    'click #submitProject':function(evt,tmpl){
    var name = tmpl.find('.name').value;
    if (name.length == ''){
        alert("Please enter a valid name");
    }
    else{
    $('#responsive').modal('toggle');
    var owner = tmpl.find('.owner').value;
    var status = tmpl.find('.status').value;
    var priority = tmpl.find('.priority').value;
    var date = tmpl.find('#datepicker').value;        
    var url = tmpl.find('#url').value;
    var description = tmpl.find('#description').value;
    var _id = Projects.insert({name:name,owner:owner,status:status,priority:priority,date:date, url:url, description:description});
    console.log(Meteor.call("getScreenshot", url, _id));
    console.log("project added");
    }
}
})

Template.projectForm.rendered=function() {

    $('.datepicker').datepicker({
    format: "dd/mm/yyyy",
    autoclose: true
});
}


