const { Sequelize, sequelize } = require("../create-tables");

const Subject = sequelize.define("subject", {
    title: {
        type: Sequelize.STRING,
        primaryKey : true
    }, 
    isCourse: {
        type: Sequelize.TINYINT(1),
        primaryKey : true
    },
    tag: {
        type: Sequelize.STRING,
        unique: true
    }
});

module.exports = Subject;