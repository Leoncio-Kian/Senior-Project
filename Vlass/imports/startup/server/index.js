/**
 * Created by leonc on 4/7/2016.
 */
import 'meteor/numtel:mysql';

export var liveDb = new LiveMysql({
  host: 'localhost',
  port: 3407,
  user: 'root',
  password: '',
  database: 'vlassdb'
});


var closeAndExit = function() {
  liveDb.end();
  process.exit();
};

process.on('SIGTERM', closeAndExit);
process.on('SIGINT', closeAndExit);

Streamy.Rooms.onEmit = function(msg, data, from, to) {
  if(msg === '__join__')
    return true;

  return from !== to;
};