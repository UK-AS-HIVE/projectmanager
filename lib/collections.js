Projects = new Meteor.Collection('projects', {schema: new SimpleSchema({
	name: {
		type: String,
		label: "Name",
		max: 200
	},
	owner: {
		type: String,
		label: "Owner",
		max: 200
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
		label: "Due Date"
	},
	url: {
		type: String,
		label: "URL"
	},
	description: {
		type: String,
		label: "Description"
	},
	notes: {
		type: String,
		label: "Notes"
	},
	software: {
		type: String,
		label: "Software"
	},
	time: {
		type: String,
		label: "Time Submitted"
	},
	tags: {
		type: [String],
		label: "Tags"
	}


	})
});

