const router = require("express").Router(); //import express router
let Student = require("../models/Student"); //import student model

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const age = Number(req.body.age);
  const gender = req.body.gender;
  const address = req.body.address;

  const newStudent = new Student({
    name,
    age,
    gender,
    address,
  }); //create new student object

  newStudent
    .save()
    .then(() => {
      res.json("student added");
    })
    .catch((err) => {
      console.log(err);
    });
}); //create route for add student details and assign post method

router.route("/").get((req, res) => {
  Student.find()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      console.log(err);
    });
}); //create route for get all student details and assign get method

router.route("/update/:id").put(async (req, res) => {
  let userId = req.params.id; //get id from backend and assign to variable
  // const name=req.body.name;
  // const age=Number(req.body.age);
  // const gender=req.body.gender;
  // const address=req.body.address;
  //using destructuring can get values from one line
  const { name, age, gender, address } = req.body; //get values from frontend using request body and assign to variables

  const updateStudent = {
    name,
    age,
    gender,
    address,
  }; //create object

  const update = await Student.findByIdAndUpdate(userId, updateStudent)
    .then(() => {
      res.status(200).send({ status: "User updated" }); //send status to frontend
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message }); //send error to frontend
    });
});

router.route("/delete/:id").delete(async (req, res) => {
  let userId = req.params.id; //get id from backend and assign to variable
  await Student.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: "user deleted", user: userId }); //send status to frontend
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "error with deleting data", error: err.message }); //send error to frontend
    });
});

router.route("/get/:id").get(async (req, res) => {
  let userId = req.params.id; //get id from backend and assign to variable
  const user = await Student.findById(userId)
    .then((student) => {
      res.status(500).send({ status: "user fetched", student }); //send status to frontend
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "error with get user", error: err.message }); //send error to frontend
    });
});

module.exports = router; //export router
