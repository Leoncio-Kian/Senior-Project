/**
 * Created by leonc on 4/3/2016.
 */
import { liveDb } from '../classrooms.js';

Meteor.publish('allClasses', function() {
  return liveDb.select(
    'SELECT * FROM classrooms',
    [ { table: 'classrooms' } ]
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

