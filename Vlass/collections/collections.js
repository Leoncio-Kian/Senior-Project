Schema = {};

Messages = new Meteor.Collection("messages");

Schema.message = new SimpleSchema({
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



Schema.UserProfile = new SimpleSchema({
  firstName: {
    type: String,
    optional: true
  },
  lastName: {
    type: String,
    optional: true
  },
  birthday: {
    type: Date,
    optional: true
  },
  gender: {
    type: String,
    allowedValues: ['M','F'],
    optional: true
  },
  country: {
    type: String,
    optional: true
  }


});

Schema.User = new SimpleSchema({
  username: {
    type: String,
    optional: true
  },
  emails: {
    type: Array,
    optional: true
  },
  "emails.$": {
    type: Object
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
    type: Boolean
  },
  createdAt: {
    type: Date
  },
  profile: {
    type: Schema.UserProfile,
    optional: true
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  heartbeat: {
    type: Date,
    optional: true
  }

});

Meteor.users.attachSchema(Schema.User);

if(Meteor.isServer) {
  Meteor.publish("messages-classid", function (classid) {
    console.log('publishing messages!');
    return Messages.find({room: classid});
  });

  Messages.allow({
    'insert': function () {
      return true;
    }
  });
}