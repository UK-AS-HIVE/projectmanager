isAdmin = function(userId){
	var user = Meteor.users.findOne({_id: userId});
	return user && Admins.findOne({name: user.username})
}

Meteor.publish('projects', function(){
	var userId = this.userId;
	if (isAdmin(userId)){
		return Projects.find();
	}
})

Projects.allow({
	insert : function(userId){
		return isAdmin(userId);
	},
	update : function(userId){
		console.log(userId);
		return isAdmin(userId)
	},
	remove : function(userId){
		return isAdmin(userId);
	}
})


Meteor.publish('images', function(){
	return Thumbnails.find();
});

Thumbnails.allow({
	remove : function(){
		return true;
	},
	insert : function(){
		return true;
	}
})

Meteor.publish('screenshots', function(){
	return Screenshots.find();
});
Screenshots.allow({
	remove : function(){
		return true;
	},
	insert : function(){
		return true;
	}
	
})

Meteor.publish('admins', function(){
	return Admins.find();
});

Admins.allow({
	insert : function(userId){
		return isAdmin(userId)
	},
	update : function(userId){
		return isAdmin(userId)
	},
	remove : function(userId){
		return isAdmin(userId);
	}
})
