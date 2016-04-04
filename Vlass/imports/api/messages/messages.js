/**
 * Created by leonc on 4/3/2016.
 */
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import 'meteor/aldeed:collection2';

export const Messages = new Meteor.Collection("messages");

var message = new SimpleSchema({
  username: {
    type: String
  },
  text: {
    type: String
  },
  room: {
    type: Number
  }
});

//Messages.attachSchema(Schema.message);

