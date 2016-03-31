/**
 * Created by leonc on 3/31/2016.
 */
//Template.chatroom.onCreated();
Template.chatroom.onRendered(function () {
  console.log('in chatroom and id is =', Session.get("classid"));
  if(Session.get("classid") !== null) {
    Streamy.join('chatroom ' + Session.get("classid"));
  } else {
    console.log("something went very very wrong");
  }
});
Template.chatroom.helpers({
  'messages': function () {
    
  }
  
});
Template.chatroom.events({
  "submit .submitMessage": function (event) {
    var message = event.target.userMessage.value;
    Steamy.rooms('chatroom ' + Session.get("classid")).emit('sendMessage', message);
  }
});

Streamy.on('sendMessage', function (msg){
  if (!msg) return;

  
})
//Template.chatroom.onDestroyed();