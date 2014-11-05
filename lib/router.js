Router.route('/', function(){
  if (!Meteor.user()){
    this.render('login');
  }
  else if (Meteor.user().view == "Classic"){
    this.render('projects');
  }
  else if (Meteor.user().view == "Modern"){
    this.render('projects_new')
  }
});

Router.route('/manage', function(){
  this.render('manage');
});
