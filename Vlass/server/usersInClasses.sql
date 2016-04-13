use VlassDB;
CREATE TABLE `usersInClasses` (
  `userid` char(24) NOT NULL,
  `classid` int NOT NULL,
  PRIMARY KEY (`userid`, `classid`),
FOREIGN KEY (userid) REFERENCES users (userid) ON DELETE CASCADE,
FOREIGN KEY (classid) REFERENCES classrooms (classid) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;