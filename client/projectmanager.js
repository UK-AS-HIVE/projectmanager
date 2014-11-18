if (Meteor.isClient) {
	Meteor.subscribe('projects');
	Meteor.subscribe('images');
	Meteor.subscribe("screenshots");
  Meteor.subscribe("smallScreenshots");
	Meteor.subscribe("admins");
  Meteor.subscribe("userData");
  Meteor.subscribe("tags");
}
