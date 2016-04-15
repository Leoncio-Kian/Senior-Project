import './components/peer.js';

Template.vlassroom.onCreated(function () {

  console.log('in vlassroom and id is = ', this.data._id);
  Session.set("classid", this.data._id);
  Session.set("socketid", 'vlassroom ' + this.data._id);
  Streamy.join(Session.get("socketid"));
  Meteor.call('add_user_to_classroom', Meteor.userId(), Session.get("classid"));
  thisclass = new MysqlSubscription('thisclass', Session.get("classid"));

  window.peer = new Peer({
    key: 'fr87aq2zcjbawcdi',  // get a free key at http://peerjs.com/peerserver
    debug: 3,
    config: {
      'iceServers': [
        {url: 'stun:stun.l.google.com:19302'},
        {url: 'stun:stun1.l.google.com:19302'}
      ]
    }
  });
});

import '../page.css';
import './vlassroom.css';
import './vlassroom.view.html';
import './components/chatroom/chatroom.js';
import './components/whiteboard/whiteboard.js';
import './components/receiver/receiver.html';
import './components/receiver/receiver.js';
import './components/emitter/emitter.html';
import './components/emitter/emitter.js';

Template.vlassroom.onDestroyed(function () {
  Streamy.leave(Session.get("socketid"));
  Session.set("socketid", null);
  Session.set("classid", null);
  peer.disconnect();
  peer.destroy();
  thisclass.stop();
  Meteor.call('remove_user_from_classroom', Meteor.userId());
});

Template.vlassroom.helpers({
  'infoLoaded': function () {
    if(thisclass.reactive()[0]) {
      return true;
    } else{
      return false;
    }
  },
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
  },
  'isMeshAudio': function () {
    if(thisclass.reactive()[0]) {
      if(thisclass.reactive()[0].audio === "MESH"){
        console.log("istrue!");
        return true;
      } else{
        console.log(thisclass.reactive()[0].audio);
        return false;
      }
    }
  },
  'isChatroomEnabled': function () {
    if(thisclass.reactive()[0].chatroomEnabled === 1){
      return true;
    } else{
      return false;
    }
  },
  'isInstructor': function () {
    console.log(thisclass.reactive()[0].userid === Meteor.userId());
    if(thisclass.reactive()[0].userid === Meteor.userId()){
      return true;
    } else {
      return false;
    }

  }
});

