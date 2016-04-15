import { Router, RouteController } from 'meteor/iron:router';

import '../../ui/layouts/Index.css';
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
    if(!Meteor.userId()) {
      this.redirect('/login');
    }
    else {
      console.log('im about to render vlassroom!');
      this.render('vlassroom', {to: 'aside'});
    }
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
  if (Meteor.userId()){
    this.redirect('/');
  }
  else {
    this.render('login', {to: 'aside'});
  }
  });
Router.route('/register', function () {
  if (Meteor.userId()){
    this.redirect('/');
  }
  else {
    this.render('register', {to: 'aside'});
  }
  });
Router.route('/classrooms', function () {
  this.render('classrooms', { to: 'aside' });
});

Router.route('/classrooms/:_id', {
  name: 'vlassroom',
  controller: 'vlassroomController'

});

Router.route('/dashboard', function () {
  if(!Meteor.userId()){
    this.redirect('/login');
  }
  else {
    this.render('dashboard', {to: 'aside'});
  }
});

Router.route('/landing', function () {
  this.redirect('/');
});

Router.route('/logout', function () {
  if (Meteor.userId()){
    Meteor.logout(function (error) {
      console.log(error);
    });
  }


  this.redirect('/');
})