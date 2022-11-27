const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

const Note = sequelize.define("Note", {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true
    },
    SubjectIsCourse: {
        type: DataTypes.TINYINT(1),
        primaryKey : true
    },
    SubjectName: {
        type: DataTypes.STRING,
        primaryKey : true
    }, 
    Text: {
        type: DataTypes.STRING
    }
});

module.exports = Note;