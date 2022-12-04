const User = require("./models/user");
const Subject = require("./models/subject");
const Note = require("./models/note");

const express = require("express");
const app = express();

const { sequelize, Sequelize } = require("./create-tables");

//Database relations
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

//Routes
const userRouter = require("./routes/user-routes");
const subjectRouter = require("./routes/subject-routes");
const noteRouter = require("./routes/note-routes");

app.use(express.json());
app.use("/users", userRouter);
app.use("/notes", noteRouter);
app.use("/subjects", subjectRouter);
app.use((error, req, res, next) => {
    console.warn(error);
    res.status(500).json({ message: 'Server error'})
});

app.listen(8000, async () => {
    try {
      await sequelize.authenticate();
      console.warn("Connected");
    } catch (error) {
      console.warn("Unable to connect to db");
      console.warn(error);
    }
  });

module.exports = app;