UI.registerHelper('view',function(input){
    if (Meteor.users.findOne({_id: Meteor.userId()}).view == input)
      return true
    else
      return false
});