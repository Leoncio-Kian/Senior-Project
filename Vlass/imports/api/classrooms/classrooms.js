/**
 * Created by leonc on 4/3/2016.
 */
import { LiveMysql } from 'meteor/numtel:mysql';

export var liveDb = new LiveMysql({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '6882907',
  database: 'VlassDB'
});
console.log('inside the api classrooms js file');

var closeAndExit = function() {
  liveDb.end();
  process.exit();
};

process.on('SIGTERM', closeAndExit);
process.on('SIGINT', closeAndExit);

