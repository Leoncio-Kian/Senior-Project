CREATE DATABASE `VlassDB`;
USE `VlassDB`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `instructor` boolean DEFAULT FALSE,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

INSERT INTO `users` (`instructor`, `firstname`, `lastname`) VALUES 
  ('true','Lars', 'Keplar'),('false', 'Leibniz', 'aragato'),('false', 'Maxwell', 'truth');