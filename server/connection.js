const User = require("./models/user");
const Subject = require("./models/subject");
const Note = require("./models/note");
const auth = require("./middleware/auth");

const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors({
    origin: '*'
  }));

const { sequelize, Sequelize } = require("./create-tables");

//Database relations
User.hasMany(Subject, {
    foreignKey: {
        name: "userEmail"
    }
});
Subject.hasMany(Note, {
    foreignKey: {
        name: "subjectId"
    }
});
User.hasMany(Note, {
    foreignKey: {
        name: "userEmail"
    }
})

//Routes
const userRouter = require("./routes/user-routes");
const subjectRouter = require("./routes/subject-routes");
const noteRouter = require("./routes/note-routes");

app.use(express.json());
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use("/users", userRouter);
app.use(auth);
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