'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [1, 100],
      }
    },
    content: DataTypes.TEXT,
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    notebookId: DataTypes.INTEGER
  }, {});
  Note.associate = function(models) {
    // associations can be defined here
    Note.belongsTo(models.User, { foreignKey: "userId" });
    Note.belongsTo(models.Notebook, { foreignKey: "notebookId" });
    const columnMapping = {
      through: "NoteTag",
      foreignKey: "noteId",
      otherKey: "tagId"
    }
    Note.belongsToMany(models.Tag, columnMapping);
  };
  return Note;
};