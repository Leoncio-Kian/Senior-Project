import { Router, RouteController } from 'meteor/iron:router';
import '../../ui/layouts/Index.html';

import '../../ui/pages/landing/landing.js';
import '../../ui/pages/classrooms/classrooms.js';
import '../../ui/pages/dashboard/dashboard.js';
import '../../ui/pages/login/login.js';
import '../../ui/pages/vlassroom/vlassroom.js';
Router.configure({
  layoutTemplate: 'Vlass-Layout'
});

vlassroomController = RouteController.extend({
  template: 'vlassroom',
  data: function () {
    return { _id: this.params._id };
  },
  action: function () {
    console.log('im about to render vlassroom!');
    this.render('vlassroom', { to: 'aside' });
  }
});

Router.onBeforeAction(function () {
  console.log('this went first!');
  if (!Meteor.userId()) {
    console.log('not logged in!');
  }
  else {
    console.log(Meteor.userId());
    this.next();
  }
}, { only: ['whiteboard'] });

Router.route('/', function () {
  this.render('landing', { name: 'home', to: 'aside' });
});
Router.route('/login', function () {
  this.render('login', { to: 'aside' });
});
Router.route('/register', function () {
  this.render('register', { to: 'aside' });
});
/*
Router.route('/whiteboard', function () {
  this.render('whiteboard', {to: 'aside'});
});
*/
Router.route('/classrooms', function () {
  this.render('classrooms', { to: 'aside' });
});

Router.route('/classrooms/:_id', {
  name: 'vlassroom',
  controller: 'vlassroomController'

});

Router.route('/dashboard', function () {
  this.render('dashboard', { to: 'aside' });
});

Router.route('/landing', function () {
  this.redirect('/');
});