  classes = new MysqlSubscription('allClasses');

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

Meteor.methods({
  'add_classroom': function (userId, classname, public, duration, activeDate, maxsize, description) {
    check(classsize, Number);
    check(public, Boolean);

    console.log(userId, classname, classsize, public);
    liveDb.db.query('INSERT INTO classrooms \
      (classname, description, userid, maxsize, activeDate, duration, public) \
      VALUES (?, ?, ?, ?, ?, ?, ?)' [classname, description, userId, maxsize, activeDate, duration, public]);
  },
  'delete_classroom': function (classid) {
    liveDb.db.query('UPDATE classrooms SET deleted=false WHERE classid = ?', [classid]);
  },
  'update_classroom': function (userId, classname, public, duration, activeDate, maxsize, description) {
    //yeah lets just pretend we dont need this for now.
    //liveDb.db.query('UPDATE classrooms SET ')
  }
});