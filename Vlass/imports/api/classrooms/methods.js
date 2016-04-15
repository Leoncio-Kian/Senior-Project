/**
 * Created by leonc on 4/3/2016.
 */
import { liveDb } from '../../startup/server/index.js';

Meteor.methods({
  'add_classroom': function (userId, classname, duration, activeDate, maxsize, description, isPublic, audio, chatroomEnabled, instructorOnly) {
    //check(maxsize, Number);
    //check(availability, Boolean);

    console.log(classname, description, userId, maxsize, activeDate, duration);
    liveDb.db.query('INSERT INTO classrooms (classname, description, userid, maxsize, duration, isPublic, audio, chatroomEnabled, instructorOnly, activeDate) ' +
      'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [classname, description, userId, maxsize, duration, isPublic, audio, chatroomEnabled, instructorOnly, activeDate]);
  },
  'delete_classroom': function (classid) {
    liveDb.db.query('DELETE FROM classrooms WHERE classid = ?', [classid]);
  },
  'update_classroom': function (userId, classname, availability, duration, activeDate, maxsize, description) {
    //yeah lets just pretend we dont need this for now.
    //liveDb.db.query('UPDATE classrooms SET ')
  },
  'add_user_to_classroom': function (userid, classid) {
    liveDb.db.query('INSERT INTO usersInClasses (userid, classid) VALUES (?, ?)', [userid, classid]);
  },
  'remove_user_from_classroom': function (userid) {
    //the method will remove even repeats from it. ideally I get to stop users from going into two classes at once.
    liveDb.db.query('DELETE FROM usersInClasses WHERE userid=?', [userid]);
  }

});