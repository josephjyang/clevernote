'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Notebooks', [
     {
      name: "Gifts for Pam", 
      userId: 1,
      createdAt: new Date('March 24, 2005 09:03:22'),
      updatedAt: new Date('March 24, 2005 09:03:22') 
     },
     { 
      name: "Pranks on Dwight", 
      userId: 1,
      createdAt: new Date('March 24, 2005 09:03:22'),
      updatedAt: new Date('March 24, 2005 09:03:22')
      },
     {
      name: "Pranks on Andy",
      userId: 1,
      createdAt: new Date('September 21, 2006 10:01:12'),
      updatedAt: new Date('September 21, 2006 10:01:12')
      },
     {
      name: "Jokes for Michael",
      userId: 1,
      createdAt: new Date('March 24, 2005 09:03:22'),
      updatedAt: new Date('March 24, 2005 09:03:22')
      },
     {
      name: "Business Ideas",
      userId: 1,
      createdAt: new Date('September 25, 2008 12:09:25'),
      updatedAt: new Date('September 25, 2008 12:09:25')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Notebooks', null, {});
  }
};
