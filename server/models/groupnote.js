const { Sequelize, sequelize } = require("../create-tables");

const GroupNote = sequelize.define("groupnote", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true
    }
});

module.exports = GroupNote;