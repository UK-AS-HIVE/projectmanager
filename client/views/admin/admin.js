Template.manageAdmins.events({
  'click .addUser' : function(){
    var newUser = document.getElementById("user-input").value;
    Admins.insert({name: newUser});
    document.getElementById("user-input").value = "";
  },
  'click .removeUser' : function(){
    console.log(this._id);
    Admins.remove(this._id);
  },
  'click #screenShot' : function doScreenshot(){
        console.log("Refreshing Screenshots");
        Meteor.call("refreshScreenshots");
    },


})


Template.manageAdmins.helpers({
  admins : function(){
    return Admins.find();
  }
})
