'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [1, 50],
      }
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Tag.associate = function(models) {
    // associations can be defined here
    Tag.belongsTo(models.User, { foreignKey: "userId" });
    const columnMapping = {
      through: "NoteTag",
      foreignKey: "tagId",
      otherKey: "noteId"
    }
    Tag.belongsToMany(models.Note, columnMapping);

  };
  return Tag;
};