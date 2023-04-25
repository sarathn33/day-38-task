// Design database for Zen class programme

// 1.users

db.users.insertMany([
    {
        userid: 1,
        name: "Sarath",
        email: "sarath@gmail.com",
        mentorid: 1
    },
    {
        userid: 2,
        name: "darshan",
        email: "darshan@gmail.com",
        mentorid: 2
    },
    {
        userid: 3,
        name: "Rahul",
        email: "rahul@gmail.com",
        mentorid: 3
    },
    {
        userid: 4,
        name: "badri",
        email: "badri@gmail.com",
        mentorid: 3
    },
    {
        userid: 5,
        name: "vignesh",
        email: "vignesh@gmail.com",
        mentorid: 1
    },
])

//2.codekata//

db.codekata.insertMany([
    {
        userid: 1,
        problems: 10
    },
    {
        userid: 2,
        problems: 20
    },
    {
        userid: 3,
        problems: 30
    },
    {
        userid: 4,
        problems: 40
    },
    {
        userid: 5,
        problems: 50
    },
]);

//3.Attendence//

db.attendence.insertMany([
    {
        userid: 1,
        topicid: 1,
        attend: true
    },
    {
        userid: 2,
        topicid: 2,
        attend: false
    },
    {
        userid: 3,
        topicid: 3,
        attend: false
    },
    {
        userid: 4,
        topicid: 4,
        attend: true
    },
    {
        userid: 5,
        topicid: 5,
        attend: true
    },
])


//4.Topics//

db.topics.insertMany([
    {
        topicid: 1,
        topic: "javascript",
        topic_data: new Date("2022-10-5"),
    },
    {
        topicid: 2,
        topic: "html",
        topic_data: new Date("2022-10-10"),
    },
    {
        topicid: 3,
        topic: "css",
        topic_data: new Date("2022-10-15"),
    },
    {
        topicid: 4,
        topic: "react",
        topic_data: new Date("2022-10-20"),
    },
    {
        topicid: 5,
        topic: "mongoDB",
        topic_data: new Date("2022-10-25"),
    },
])

//5.tasks//

db.tasks.insertMany([
    {
        taskid: 1,
        topicid: 1,
        userid: 1,
        task: "javascript task",
        due_date: new Date("2022-10-5"),
        submitted: true
    },
    {
        taskid: 2,
        topicid: 2,
        userid: 2,
        task: "html task",
        due_date: new Date("2022-10-10"),
        submitted: false
    },
    {
        taskid: 3,
        topicid: 3,
        userid: 3,
        task: "css task",
        due_date: new Date("2022-10-15"),
        submitted: true
    },
    {
        taskid: 4,
        topicid: 4,
        userid: 4,
        task: "react task",
        due_date: new Date("2022-10-20"),
        submitted: false
    },
    {
        taskid: 5,
        topicid: 5,
        userid: 5,
        task: "mongoDB task",
        due_date: new Date("2022-10-25"),
        submitted: true
    },
])

//6.company drives//

db.companydrives.insertMany([
    {
        userid: 1,
        drive_date: new Date("2022-10-04"),
        company: "zoho"
    },
    {
        userid: 2,
        drive_date:new Date("2022-10-06"),
        company: "HCL"
    },
    {
        userid: 3,
        drive_date: new Date("2022-10-12"),
        company: "IBM"
    },
    {
        userid: 4,
        drive_date: new Date("2022-10-20"),
        company: "Honeywell"
    },
    {
        userid: 5,
        drive_date: new Date("2022-10-24"),
        company: "Animaker"
    },
])

//7.mentors//

db.mentors.insertMany([
    {
        mentorid: 1,
        mentorname: "vidhya",
        mentor_email: "vidhya@gmail.com",
        mentee_count:15
    },
    {
        mentorid: 2,
        mentorname: "sanjay",
        mentor_email: "sanjay@gmail.com",
        mentee_count:10
    },
    {
        mentorid: 3,
        mentorname: "arun kumar",
        mentor_email: "arun@gmail.com",
        mentee_count:20
    },
    {
        mentorid: 4,
        mentorname: "saravanan",
        mentor_email: "saravanan@gmail.com",
        mentee_count:14
    },
    {
        mentorid: 5,
        mentorname: "sunny",
        mentor_email: "sunny@gmail.com",
        mentee_count:35
    },
])

//--------------------------------------------------------------------------------------------//

//Solution//

//1.Find all the topics and tasks which are taught in the month of october//


db.topics.aggregate([
    {

        $lookup: {
            from: "tasks",
            localField: "topicid",
            foreignField: "topicid",
            as: "taskinfo",
        },
    },
    {
        $match: {
            $and: [
                {
                    $or: [
                        { topic_date: { $gt: new Date("30-sep-2022") } },
                        { topic_date: { $lt: new Date("1-nov-2022") } },
                    ],
                },

                {
                    $or: [
                        { "taskinfo.due_date": { $gt: new Date("30-sep-2022") } },
                        { "taskinfo.due_date": { $lt: new Date("1-nov-2022") } },
                    ],
                },
            ],
        },
    },
]);

//2.Find all the company drives which appeared between 15 oct-2022 and 31-oct-2022

db.companydrives.find({
    $or: [
        { drive_date: { $gte: ISODate("2022-10-15"),$lte: ISODate("2022-10-31") } }

    ],
}).pretty();

//3.Find all the company drives and students who are appeared for the placement//

db.companydrives.aggregate([
    {
        $lookup: {
            from: "users",
            localField: "userid",
            foreignField: "userid",
            as: "userinfo",
        },
    },
    {
        $project: {
            _id: 0,
            company: 1,
            drive_date: 1,
            "userinfo.name": 1,
            "userinfo.email": 1,
            "userinfo.userid": 1,
        },
    },
]).pretty();

//4.Find the number of problems solved by the user in codekata//

db.codekata.aggregate([
    {
        $lookup: {
            from: "users",
            localField: "userid",
            foreignField: "userid",
            as: "userinfo",
        },
    },
    {
        $project: {
            _id: 0,
            userid: 1,
            problems: 1,
            "userinfo.name": 1,
        },
    },
]).pretty();

//5.Find all the mentors who has the mentee's count more than 15//

db.users.aggregate([
    {
      $lookup: {
        from: "mentors",
        localField: "mentorid",
        foreignField: "mentorid",
        as: "mentorInfo",
      },
    },
    {
      $group: {
        _id: {
          mentorid: "$mentorInfo.mentorid",
          mentorname: "$mentorInfo.mentorname",
          mentee_count:"$mentorInfo.mentee_count"
        },
        mentee_count: { $sum: 1 },
      },
    },
    { $match: { mentee_count: { $gt: 1 } } },
  ]).pretty();
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*//
  db.mentors.find({mentee_count:{$gte:15}}).pretty();

//6.Find the number of users who are absent and task is not submitted  between 15 oct-2022 and 31-oct-2022//

db.attendance.aggregate([
    {
      $lookup: {
        from: "topics",
        localField: "topicid",
        foreignField: "topicid",
        as: "topics",
      },
    },
    {
      $lookup: {
        from: "tasks",
        localField: "topicid",
        foreignField: "topicid",
        as: "tasks",
      },
    },
    { $match: { $and: [{ attended: false }, { "tasks.submitted": false }] } },
    {
      $match: {
        $and: [
          {
            $or: [
              { "topics.topic_date": { $gte: ISODate("2022-10-15") , $lte: ISODate("2022-10-31") } }
               ],
          },
          {
            $or: [
              { "tasks.due_date": { $gte: ISODate("2022-10-15") , $lte: ISODate("2022-10-31") } },
               ],
          },
        ],
      },
    },
    {
      $count:"Absentees",
    },
  ]).pretty();