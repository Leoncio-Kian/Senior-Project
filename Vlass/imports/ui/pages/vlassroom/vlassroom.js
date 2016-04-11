import '../page.css';
import './vlassroom.css';
import './vlassroom.view.html';
import './components/chatroom/chatroom.js';
import './components/whiteboard/whiteboard.js';
import './components/audio/audio.js';

Template.vlassroom.onCreated(function () {

  console.log('in vlassroom and id is = ', this.data._id);
  Session.set("classid", this.data._id);
  //Meteor.call('add_user_to_classroom', Meteor.userId(), Session.get("classid"));
  thisclass = new MysqlSubscription('thisclass', Session.get("classid"));
});

Template.vlassroom.onDestroyed(function () {
  Session.set("classid", null);
  thisclass.stop();
  //Meteor.call('remove_user_from_classroom', Meteor.userId());
});

Template.vlassroom.helpers({
  'classdescription': function () {
    if(thisclass.reactive()[0]) {
      console.log('inside ifstatement (what)', thisclass.reactive());
      return thisclass.reactive()[0].description;
    }
  },
  'currentclassname': function () {
    if(thisclass.reactive()[0]) {
      var selectedClass = thisclass.reactive()[0].classname;
      console.log(selectedClass);
      return selectedClass;
    }
  }
});

