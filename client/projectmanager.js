if (Meteor.isClient) {
	Meteor.subscribe('projects');
	Meteor.subscribe('images');
	Meteor.subscribe("screenshots");
	Meteor.subscribe("admins");


}
