Template.classrooms.onCreated( function () {
  classes = new MysqlSubscription('allClasses');
});

Template.classrooms.helpers({
  'classrooms': function () {
    console.log(classes);
    return classes.reactive();
  }
});

Template.classrooms.onDestroyed( function () {
  classes.stop();
})