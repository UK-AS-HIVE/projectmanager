Template.projectForm.events({
    'click .addProjectBtn': function(){

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

    'click #submitProject':function(e,tmpl){
        addProject(e,tmpl);
    },
    'keypress .projectInput': function(e, tmpl){
        if (e.charCode == 13){
            addProject(e,tmpl);
        }
    }
})


Template.projectForm.rendered=function() {

    $('.datepicker').datepicker({
    format: "mm/dd/yyyy",
    autoclose: true
});
}

addProject = function(e,tmpl){
    var name = tmpl.find('.name').value;
    if (name.length == ''){
        alert("Please enter a valid name");
    }
    else{
    $('#responsive').modal('toggle');
    var owner = tmpl.find('.owner').value;
    if (owner == '')
    {
        owner = "No Owner"
    }
    var status = tmpl.find('.status').value;
    var priority = tmpl.find('.priority').value;
    var date = tmpl.find('#datepicker').value;        
    var url = tmpl.find('#url').value;
    var description = tmpl.find('#description').value;
    var notes="";
    var platform=tmpl.find('#platform').value;
    var type = tmpl.find("#type").value;
    var timeSubmitted = (new Date()).getTime();
    if (url.substr(0,7) != "http://" && url!=''){
            url = "http://" + url;
            console.log(url);
        } 
    var screenshotEnabled = tmpl.find('#screenshotToggle').checked;
    var _id = Projects.insert(
        {name:name,
            owner:owner,
            status:status,
            priority:priority,
            date:date,
            url:url, 
            description:description,
            notes: notes ,
            platform:platform,
            type:type ,
            time:timeSubmitted, 
            screenshotEnabled:screenshotEnabled});
    
    if(url != ''){
    console.log(Meteor.call("getScreenshot", url, _id));
    }
    console.log("project added");
    }
};


findPos = function (obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    return [curtop];
    }
}
