"use strict";

const mongoose = require("mongoose"),
  User = require("./models/user");

mongoose.connect(
  "mongodb://localhost:27017/soc_net",
  { useNewUrlParser: true }
);
mongoose.connection;

var people = [
  {
    firstName: "David",
    lastName: "Oligney",
    username: "Oligney",
    gender: "Male",
    location: "",
    email: "david@gmail.com", 
    password: "Pass1",
    securityQ: "What color was your first car?",
    securityA: "Blue"
  },
  {
    firstName: "Fernando",
    lastName: "Guardado",
    username: "Guardado",
    gender: "Male",
    location: "",
    email: "fernando@gmail.com", 
    password: "Pass2",
    securityQ: "What color was your first car?",
    securityA: "Red"
  },
  {
    firstName: "Matthew",
    lastName: "Hoang",
    username: "Matt",
    gender: "Male",
    location: "",
    email: "matt@gmail.com", 
    password: "Pass1",
    securityQ: "What color was your first car?",
    securityA: "Black"
  }

];

User.deleteMany()
  .exec()
  .then(() => {
    console.log("User data is empty!");
  });

var commands = [];

people.forEach(p => {
  commands.push(
    User.create({
        firstName: p.firstName,
        lastName: p.lastName,
        username: p.username,
        gender: p.gender,
        location: p.location,
        email: p.email, 
        password: p.password,
        securityQ: p.securityQ,
        securityA: p.securityA
    })
  );
});

Promise.all(commands)
  .then(r => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(`ERROR: ${error}`);
  });
