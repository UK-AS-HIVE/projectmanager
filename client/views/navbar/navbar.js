Template.menu.rendered = function() {
    $(".view-settings").popover({
        html: true,
        content: function() {
            return $("#popover-content").html();
        }
    });
    $(document).on('click', '.change-view', function() {
      Meteor.users.update({_id: Meteor.userId()}, {$set: {view: this.text}} )
      $(".view-settings").popover('hide');
    });

}
