Router.configure({
  layoutTemplate: 'Vlass-Layout'
});

vlassroomController = RouteController.extend({
  template: 'vlassroom',
  data: function () {
    return {_id: this.params._id};
  },
  action: function () {
    this.render('vlassroom', {to: 'aside'});
  }
});

Router.onBeforeAction(function () {
  console.log('this went first!');
  if(!Meteor.userId()){
    console.log("not logged in!");
  }
  else{
    console.log(Meteor.userId());
    this.next();
  }
}, {only: ['whiteboard']})

Router.route('/', function (){
  this.render('landing', {to: 'aside'});
});
Router.route('/login', function () {
  this.render('login', {to: 'aside'});
});
Router.route('/register', function () {
  this.render('register', {to: 'aside'});
});
Router.route('/whiteboard', function () {
  this.render('whiteboard', {to: 'aside'});
});
Router.route('/classrooms', function () {
  this.render('classrooms', {to: 'aside'});
});

Router.route('/classrooms/:_id', {
  name: 'vlassroom',
  controller: 'vlassroomController'
  
});