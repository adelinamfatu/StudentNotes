const { Sequelize, sequelize } = require("../create-tables");

const GroupUser = sequelize.define("groupuser", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true
    }
});

module.exports = GroupUser;