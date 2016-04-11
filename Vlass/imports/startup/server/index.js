/**
 * Created by leonc on 4/7/2016.
 */
import { LiveMysql } from 'meteor/numtel:mysql';

export var liveDb = new LiveMysql({
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

Streamy.Rooms.onEmit = function(msg, data, from, to) {
  // from and to are session ids
  // For example, if you do not want to send the message back to its emitter, just use the following code:
  if(msg === '__join__')
    return true;

  return from !== to;
};