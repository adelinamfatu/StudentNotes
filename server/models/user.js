const { Sequelize, sequelize } = require("../create-tables");

const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true
    }, 
    hashPassword: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    surname: {
        type: Sequelize.STRING,
        validate: {
            isUppercase: true
        }
    },
    name: {
        type: Sequelize.STRING,
        validate: {
            isUppercase: true
        }
    },
    faculty: {
        type: Sequelize.STRING
    },
    field: {
        type: Sequelize.STRING
    }
});

module.exports = User;