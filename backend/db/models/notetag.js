'use strict';
module.exports = (sequelize, DataTypes) => {
  const NoteTag = sequelize.define('NoteTag', {
    noteId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    tagId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  NoteTag.associate = function(models) {
    // associations can be defined here
  };
  return NoteTag;
};