// Override Meteor._debug to filter for custom msgs


Meteor._debug = (function (super_meteor_debug) {
  return function (error, info) {
    if (!(info && _.has(info, 'msg')))
      super_meteor_debug(error, info);
  };
})(Meteor._debug);

var liveDb = new LiveMysql({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '6882907',
  database: 'VlassDB'
});

var closeAndExit = function() {
  liveDb.end();
  process.exit();
};

process.on('SIGTERM', closeAndExit);
process.on('SIGINT', closeAndExit);




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
  },
  'create_user': function (User){
    console.log('made it to create user!', User);
    
    Accounts.createUser(User);
  }
});