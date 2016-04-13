Use VlassDB;
drop table `users`;
CREATE TABLE `users` (
  `userid` char(24) NOT NULL UNIQUE,
  `username` varchar (24) NOT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;