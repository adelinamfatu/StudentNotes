const { Sequelize, sequelize } = require("../create-tables");

const Group = sequelize.define("group", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true
    }, 
    name: {
        type: Sequelize.STRING
    }
});

module.exports = Group;