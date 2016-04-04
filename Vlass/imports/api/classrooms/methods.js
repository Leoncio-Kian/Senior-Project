/**
 * Created by leonc on 4/3/2016.
 */
import { liveDb } from './classrooms.js';

Meteor.methods({
  'add_classroom': function (userId, classname, availability, duration, activeDate, maxsize, description) {
    //check(maxsize, Number);
    //check(availability, Boolean);

    console.log(classname, description, userId, maxsize, activeDate, duration, availability);
    liveDb.db.query('INSERT INTO classrooms (classname, description, userid, maxsize, duration, public) VALUES (?, ?, ?, ?, ?, ?)', [classname, description, userId, maxsize, duration, availability]);
  },
  'delete_classroom': function (classid) {
    liveDb.db.query('DELETE FROM classrooms WHERE classid = ?', [classid]);
  },
  'update_classroom': function (userId, classname, availability, duration, activeDate, maxsize, description) {
    //yeah lets just pretend we dont need this for now.
    //liveDb.db.query('UPDATE classrooms SET ')
  }
});