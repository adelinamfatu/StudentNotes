const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

const User = sequelize.define("User", {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true
    }, 
    HashPassword: {
        type: DataTypes.STRING
    },
    Email: {
        type: DataTypes.STRING,
        unique: true
    },
    Surname: {
        type: DataTypes.STRING
    },
    Name: {
        type: DataTypes.STRING
    },
    Faculty: {
        type: DataTypes.STRING
    },
    Field: {
        type: DataTypes.STRING
    }
});

module.exports = User;