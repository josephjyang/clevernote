'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define('Notebook', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [1, 100],
      }
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Notebook.associate = function(models) {
    // associations can be defined here
    Notebook.belongsTo(models.User, { foreignKey: "userId" });
    Notebook.hasMany(models.Note, { foreignKey: "notebookId" });
  };
  return Notebook;
};