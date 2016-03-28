
Meteor.startup(function () {
  classrooms = new MysqlSubscription('allClasses');
})


Session.setDefault('counter', 0);

/*
Template.hello.helpers({
  counter: function () {
    return Session.get('counter');
  },
  users: function () {
    return users.reactive();
  }
});

Template.hello.events({
  'click button': function () {
    // increment the counter when button is clicked
    Session.set('counter', Session.get('counter') + 1);
  }
});

Template.user.helpers({
  selected: function () {
    return Session.equals("selectedUser", this.id) ? "selected" : '';
  }
});

*/