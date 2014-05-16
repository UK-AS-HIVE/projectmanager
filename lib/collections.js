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
		allowedValues: ['High Priority', 'Low Priority'],
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

