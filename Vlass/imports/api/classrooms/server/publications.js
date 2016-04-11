/**
 * Created by leonc on 4/3/2016.
 */

import { liveDb } from '../../../startup/server/index.js';


Meteor.publish('allClasses', function() {
  return liveDb.select(
    'SELECT * FROM classroomuserinfo',
    [ { view: 'classroomuserinfo' } ]
  );
});

Meteor.publish('ownerClasses', function (userid) {
  return liveDb.select(
    'SELECT * FROM classrooms WHERE userid=' + liveDb.db.escape(userid),
    [ {
      table: 'classrooms',
      condition: function(row, newRow, rowDeleted) {
        return row.userid === userid || (newRow && newRow.userid === userid);
      }
    }]
  );
});

Meteor.publish('thisclass', function(classid) {
  //sticking in code for checking client disconnects. probably not the best place to do this.
  //but there arent any on client disconnect hooks that i know of.
  var id = this._session.userId;
  this._session.socket.on("close", function () {
    liveDb.db.query('DELETE FROM usersInClasses WHERE userid=?', [id]);
  })


  return liveDb.select(
    'SELECT * FROM classrooms WHERE classid=' + liveDb.db.escape(classid),
    [ {
      table: 'classrooms',
      condition: function(row, newRow, rowDeleted) {
        return row.classid === classid || (newRow && newRow.classid === classid);
      }
    }]
  );
});

