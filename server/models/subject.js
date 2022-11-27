const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

const Subject = sequelize.define("Subject", {
    Name: {
        type: DataTypes.STRING,
        primaryKey : true
    }, 
    IsCourse: {
        type: DataTypes.TINYINT(1),
        primaryKey : true
    },
    Tag: {
        type: DataTypes.STRING,
        unique: true
    },
    UserId: {
        type: DataTypes.INTEGER
    }
});

module.exports = Subject;