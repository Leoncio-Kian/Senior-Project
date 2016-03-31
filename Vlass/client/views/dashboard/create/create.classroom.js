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
    var time = event.target.VlassroomTime.value;
    var duration = event.target.VlassroomDuration.value;
    var description = event.target.VlassroomDescription.value;
    var available = false;
    console.log( 'made it here!' );
    Meteor.call('add_classroom', Meteor.userId(), classname, available, duration, time, size, description);
  }
})