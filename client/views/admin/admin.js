/*Template.manageAdmins.usernames = function() {
  var admins;
  admins = TRS.Admins.findOne({});
  console.log(admins);
  if (admins != null) {
    return admins.admins.join(',');
  } else {
    return '';
  }
};

Template.manageAdmins.rendered = function() {
  var inputBox;
  inputBox = $(this.find('.admin-users'));
  return $(this.find('.admin-users')).select2({
    tags: [],
    tokenSeparators: [',', ' ', '\n'],
    multiple: true,
    initSelection: function(e, cb) {
      return cb(_.map(e.context.value.split(','), function(o) {
        return {
          id: o,
          text: o
        };
      }));
    },
    createSearchChoice: function(term) {
      return {
        id: term,
        text: term
      };
    },
    query: function(q) {
      return q.callback({
        results: Meteor.users.find({
          username: {
            $regex: '^' + q.term
          }
        }).map(function(doc, index) {
          return {
            id: doc.username,
            text: doc.username
          };
        })
      });
    }
  }).on('select2-removing', function(e) {
    if (e.val === Meteor.user().username) {
      e.preventDefault();
      return bootbox.confirm('You are removing yourself from the list of admins.  Doing so may prevent you from making necessary updates.  Are you sure you wish to continue?', function(result) {
        var admins;
        if (result === true) {
          admins = TRS.Admins.findOne({});
          Meteor.call('upsertAdmins', _.without(admins.admins, e.val));
        } else {
          admins = TRS.Admins.findOne({});
          if (admins != null) {
            return inputBox.val(admins.admins.join(',')).trigger('change');
          }
        }
      });
    }
  }).change(function(e) {
    if (e.val != null) {
      return Meteor.call('upsertAdmins', e.val);
    }
  });
};
*/

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
