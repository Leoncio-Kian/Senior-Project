/**
 * Created by leonc on 3/30/2016.
 */
import './edit.classroom.view.html';

Template.editClassroom.onCreated(function () {
  ownerClasses = new MysqlSubscription('ownerClasses', Meteor.userId());
})
Template.editClassroom.helpers({
  'ownerClassrooms': function () {
    return ownerClasses.reactive();
  }
});
Template.editClassroom.events({
  'click #deleteClass': function () {
    console.log(this.classid);
    console.log(ownerClasses);
    Meteor.call('delete_classroom', this.classid);
    ownerClasses.changed();
  }
});

Template.editClassroom.onDestroyed(function () {
  ownerClasses.stop();
});