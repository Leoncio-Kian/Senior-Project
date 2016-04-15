/**
 * Created by leonc on 3/31/2016.
 */
//Template.chatroom.onCreated();
import './chatroom.css';
import './chatroom.view.html';
import {Messages } from '../../../../../api/messages/messages.js';
Template.chatroom.onCreated( function () {

  Meteor.subscribe("messages-classid", Session.get("classid"));
})

Template.chatroom.onRendered(function () {
  console.log('in chatroom and id is =', Session.get("classid"))

  if(Session.get("classid") !== null) {
    //Streamy.join('chatroom ' + Session.get("classid"));
  } else {
    console.log("something went very very wrong");
  }
});
Template.chatroom.helpers({
  'messages': function () {
    return Messages.find({room: Session.get("classid")});
  }
  
});
Template.chatroom.events({
  "click .submitMessage": function (event) {
    console.log('submitting!');
    var message = document.getElementById("userMessage");
    //Steamy.rooms('chatroom ' + Session.get("classid")).emit('sendMessage', message);
    Messages.insert({username: Meteor.userId(), text: message.value, room: Session.get("classid")}, function (error, result){
      console.log(result);
    });
    console.log(Messages.find({}).fetch());
  }
});

Streamy.on('sendMessage', function (msg){
  if (!msg) return;
  console.log('got message');
  
})
//Template.chatroom.onDestroyed();