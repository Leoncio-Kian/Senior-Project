

CREATE DATABASE `vlassdb`;
USE `vlassdb`;

#Use VlassDB;
#drop table `users`;
CREATE TABLE `users` (
  `userid` char(24) NOT NULL UNIQUE,
  `username` varchar (24) NOT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

#drop table `classrooms`;
CREATE TABLE `classrooms` (
  `classid` int NOT NULL AUTO_INCREMENT,
  `classname` varchar(45) NOT NULL UNIQUE,
  `description` varchar(300),
  `userid` char(24) NOT NULL,
  `maxsize` int(10) DEFAULT 30,
  `activeDate` datetime default current_timestamp,
  `duration` int(10) DEFAULT 2,
  `isPublic` boolean DEFAULT TRUE,
  `audio` char(10) DEFAULT "MESH",
  `chatroomEnabled` boolean DEFAULT TRUE,
  `instructorOnly` boolean DEFAULT TRUE,
  PRIMARY KEY (`classid`),
  FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `usersInClasses` (
  `userid` char(24) NOT NULL,
  `classid` int NOT NULL,
  PRIMARY KEY (`userid`, `classid`),
FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE,
FOREIGN KEY (`classid`) REFERENCES `classrooms` (`classid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;


CREATE VIEW classroomCount AS
  SELECT `classid`, COUNT(usersInClasses.userid) AS `classcount` FROM `usersInClasses`;

  CREATE VIEW classroomUserInfo AS
  SELECT classrooms.classid, classrooms.classname, users.username, classrooms.maxsize, IFNULL(classroomCount.classcount, 0) AS currentsize
    FROM `classrooms` JOIN `users` LEFT JOIN classroomCount
    ON classrooms.classid=classroomCount.classid
    WHERE classrooms.userid=users.userid AND classrooms.isPublic=true;

/*
CREATE VIEW classroomUserInfo AS
  SELECT classrooms.classid, classrooms.classname, users.username, classrooms.maxsize, IFNULL(cs.classcount, 0) AS currentsize
    FROM `classrooms` JOIN `users` LEFT JOIN (SELECT `classid`, COUNT(usersinclasses.userid) AS `classcount` FROM `usersinclasses`) AS `cs`
    ON classrooms.classid=cs.classid
    WHERE classrooms.userid=users.userid AND classrooms.isPublic=true;
    */