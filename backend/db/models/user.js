'use strict';
const { Validator } = require("sequelize")
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        }
      }
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [1, 50],
      }
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [1, 50],
      }
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [3, 256],
        isEmail(value) {
          if (!Validator.isEmail(value)) {
            throw new Error('Invalid email.')
          }
        }
      }
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] }
      },
      loginUser: {
        attributes: {}
      }
    }
  });

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Notebook, { foreignKey: "userId" });
    User.hasMany(models.Note, { foreignKey: "userId" });
    User.hasMany(models.Tag, { foreignKey: "userId" });
  };

  User.prototype.toSafeObject = function() {
    const { id, username, firstName, lastName, email } = this;
    return {id, username, firstName, lastName, email };
  }

  User.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString())
  }

  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  }

  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  }

  User.signup = async function ({ username, email, password, firstName, lastName }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      firstName,
      lastName,
      email,
      hashedPassword
    });
    return await User.scope('currentUser').findByPk(user.id);
  }

  User.revise = async function ({ id, username, email, password, firstName, lastName }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = User.findByPk(id);
    const updatedUser = await user.update({
      username,
      firstName,
      lastName,
      email,
      hashedPassword
    });
    return await User.scope('currentUser').findByPk(updatedUser.id);
  }

  return User;
};