drop view classroomuserinfo;
CREATE VIEW classroomUserInfo AS
	SELECT classrooms.classid, classrooms.classname, users.username, classrooms.maxsize, IFNULL(cs.classcount, 0) AS currentsize
    FROM classrooms JOIN users LEFT JOIN (SELECT classid, COUNT(usersinclasses.userid) AS classcount FROM usersinclasses) AS cs
    ON classrooms.classid=cs.classid
    WHERE classrooms.userid=users.userid;