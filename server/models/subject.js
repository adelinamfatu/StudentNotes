const { Sequelize, sequelize } = require("../create-tables");

const Subject = sequelize.define("subject", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true
    }, 
    title: {
        type: Sequelize.STRING
    },
    tag: {
        type: Sequelize.STRING
    }
});

module.exports = Subject;