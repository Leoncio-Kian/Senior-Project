/*CREATE DATABASE `VlassDB`;
USE `VlassDB`;

CREATE TABLE `classroom` (
  `classid` varchar(16) NOT NULL UNIQUE,
  `classname` varchar(45) NOT NULL UNIQUE,
  `owner` varchar(24) DEFAULT NULL,
  `currentsize` int(10) DEFAULT 0,
  `maxsize` int(10) DEFAULT 30,
  `public` boolean DEFAULT TRUE,
  PRIMARY KEY (`classid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

CREATE TRIGGER before_insert_classroom
  BEFORE INSERT ON `classroom`
  FOR EACH ROW
  SET new.classid = uuid();

INSERT INTO `classroom` (`classname`, `owner`, `currentsize`, `maxsize`, `public`) VALUES 
  ('classOne', 'leon', '0', '30', false),('victors class', 'victor', '0', '45', true),('Music theory', 'chopin', '2', '43', true);
*/

USE `VlassDB`;

CREATE TABLE `classrooms` (
  `classid` int NOT NULL AUTO_INCREMENT,
  `classname` varchar(45) NOT NULL UNIQUE,
  `description` varchar(300),
  `userid` varchar(45) DEFAULT NULL,
  `currentsize` int(10) DEFAULT 0,
  `maxsize` int(10) DEFAULT 30,
  `activeDate` datetime default current_timestamp,
  `duration` int(10) DEFAULT 2,
  `public` boolean DEFAULT TRUE,
  `deleted` boolean default false,
  PRIMARY KEY (`classid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `classrooms` (`classname`, `description`, `userid`, `maxsize`, `public`, `duration`) VALUES
  ('classOne', 'the first class ever made!', 'leon', '30', false, '3'),('victors class', 'dawg pls', 'victor', '45', true, '2'),('Music theory', 'an introduction to the romantic period','chopin', '43', true, '4');