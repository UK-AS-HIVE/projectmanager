Projects = new Meteor.Collection('projects', {schema: new SimpleSchema({
	name: {
		type: String,
		label: "Name",
		max: 200
	},
	owner: {
		type: String,
		label: "Owner",
		max: 200,
		optional: true
	},
	status: {
		type: String,
		allowedValues: ['In Progress', 'Done', 'On Hold', 'Not Scheduled'],
		label: "Status"
	},
	priority: {
		type: String,
		allowedValues: ['High Priority', 'Medium Priority', 'Low Priority'],
		label: "Priority"
	},
	date: {
		type: String,
		label: "Due Date",
		optional: true
	},
	url: {
		type: String,
		label: "URL",
		optional: true
	},
	description: {
		type: String,
		label: "Description",
		optional: true
	},
	notes: {
		type: String,
		label: "Notes",
		optional: true
	},
	software: {
		type: String,
		label: "Software",
		optional: true

	},
	time: {
		type: String,
		label: "Time Submitted",
		optional: true
	},
	tags: {
		type: [String],
		label: "Tags",
		optional: true
	},

	screenshotPath: {
		type: String,
		label: "Screenshot",
		optional: true
	},

	screenshotEnabled: {
		type: Boolean,
		label: "Screenshot Tracking",
		optional:false
	},
	platform:{
		type:String,
		optional:true
	},
	type:{
		type:String,
		optional:true
	}


	})
});

Admins = new Meteor.Collection('admins',{ schema: new SimpleSchema({
    name:
    {
      type: String,
      label: 'users with Admin Rights'
  	}
  })
});

Thumbnails = new FS.Collection("images", {stores:[new FS.Store.FileSystem("images")]});
Screenshots = new FS.Collection("screenshots", {stores:[new FS.Store.FileSystem("screenshots")]});