#CREATE DATABASE `VlassDB`;
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
