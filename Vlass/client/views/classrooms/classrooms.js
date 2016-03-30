Template.classrooms.rendered = function () {
  // classrooms = new MysqlSubscription('allclasses');
};

Template.classrooms.helpers({
  'classrooms': function () {
    return classrooms.reactive();
  }
});
