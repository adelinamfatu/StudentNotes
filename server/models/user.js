const { Sequelize, sequelize } = require("../create-tables");

const User = sequelize.define("user", { 
    email: {
        type: Sequelize.STRING,
        unique: true,
        primaryKey : true,
        validate: {
            isEmail: true
        }
    },
    hashPassword: {
        type: Sequelize.STRING
    },
    surname: {
        type: Sequelize.STRING,
    },
    name: {
        type: Sequelize.STRING,
    },
    faculty: {
        type: Sequelize.STRING
    },
    field: {
        type: Sequelize.STRING
    },
    token: {
        type: Sequelize.STRING
    }
});

module.exports = User;