import '../page.css';
import './dashboard.view.html';

import './components/create/create.classroom.js';
import './components/edit/edit.classroom.js';

Template.dashboard.helpers({
  Email: function () {
    if (Meteor.user()) {
      console.log(Meteor.user())
      console.log(Meteor.user().emails[0].address);
      return Meteor.user().emails[0].address;
    }

  }
});
