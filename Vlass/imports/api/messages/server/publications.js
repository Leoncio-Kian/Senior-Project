/**
 * Created by leonc on 4/3/2016.
 */
import 'meteor/aldeed:collection2';
import { Messages } from '../messages.js';


Meteor.publish("messages-classid", function (classid) {
  console.log('publishing messages!');
  return Messages.find({room: classid});
});

Messages.allow({
  'insert': function () {
    return true;
  }
});