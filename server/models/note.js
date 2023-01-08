const { Sequelize, sequelize } = require("../create-tables");

const Note = sequelize.define("note", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true
    }, 
    title: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.STRING
    }
});

module.exports = Note;