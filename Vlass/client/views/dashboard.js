Template.dashboard.helpers({
  Email: function () {
    console.log(Meteor.user().emails[0].address);
    return Meteor.user().emails[0].address;
  }
});