Template.createClassroom.helpers({
  foo: function () {
    // ...
  }
});

Template.createClassroom.events({
  "submit .submit-Vlassroom": function (event) {
    //prevent default brower form submit
    event.preventDefault();

    //get value from form element
    var classname = event.target.vlassroom-Name.value;
    var size = event.target.vlassroom-Size.value;
    var public = false;
    
    Meteor.call('add_classroom', Meteor.userId(), classname, size, public, function (error, response) {
      if (error) 
        console.log('there was an error!');
      else {
        console.log('something correctish happened!', response);
      }
    })
  }
})