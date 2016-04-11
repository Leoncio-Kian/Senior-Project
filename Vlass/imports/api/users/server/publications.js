/**
 * Created by leonc on 4/7/2016.
 */
import { liveDb } from '../../../startup/server/index.js';
import {} from 'meteor/matb33:collection-hooks';

Meteor.users.after.insert( function (userId, doc) {
  console.log(this._id);
  console.log(doc.username);

  liveDb.db.query('INSERT INTO users (userid, username) VALUES (?, ?)', [this._id, doc.username]);
});

Meteor.users.after.remove( function (userId, doc) {
  console.log(this._id);
  console.log(doc.username);

  liveDb.db.query('DELETE FROM users WHERE userid= ?', [this._id]);
});