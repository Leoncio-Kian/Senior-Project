import './create.classroom.view.html';

Template.createClassroom.helpers({
  foo: function () {
    // ...
  }
});

Template.createClassroom.events({
  "submit .newVlassroom": function (event) {
    //prevent default brower form submit
    event.preventDefault();

    //get value from form element
    var classname = event.target.VlassroomName.value;
    var size = event.target.VlassroomSize.value;
    var activeDate = event.target.VlassroomTime.value;
    var duration = event.target.VlassroomDuration.value;
    var description = event.target.VlassroomDescription.value;
    var isPublic = (event.target.isPublic.value === "true") ? 1: 0;
    var audioType = event.target.audioType.value;
    var chatroomEnabled = (event.target.chatroomEnabled.value === "true")? 1:0;
    var instructorOnly = (event.target.instructorOnly.value === "true") ? 1:0;
 
    console.log( 'made it here!' );
    Meteor.call('add_classroom', Meteor.userId(), classname, duration, activeDate, size, description, isPublic, audioType, chatroomEnabled, instructorOnly);
  }
})

//(userId, classname, duration, activeDate, maxsize, description, isPublic, audio, chatroomEnabled, instructorOnly)