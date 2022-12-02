const User = require("./models/user");
const Subject = require("./models/subject");
const Note = require("./models/note");

const express = require("express");
const app = express();

const { sequelize, Sequelize } = require("./create-tables");

User.hasMany(Subject, {
    foreignKey: {
        name: "userId"
    }
});
Subject.hasMany(Note, {
    foreignKey: {
        name: "subjectTitle"
    }
});
Subject.hasMany(Note, {
    foreignKey: {
        name: "subjectIsCourse"
    }
});
User.hasMany(Note, {
    foreignKey: {
        name: "userId"
    }
})

app.listen(8000, async () => {
    try {
      await sequelize.authenticate();
      console.warn("Connected");
    } catch (error) {
      console.warn("Unable to connect to db");
      console.warn(error);
    }
  });