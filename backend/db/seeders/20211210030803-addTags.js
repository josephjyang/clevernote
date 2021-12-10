'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Tags', [
     { name: 'funny', userId: 1, createdAt: new Date('March 24, 2005 10:04:23'), updatedAt: new Date('March 24, 2005 10:04:23') },
     { name: 'prank', userId: 1, createdAt: new Date('March 24, 2005 10:04:23'), updatedAt: new Date('March 24, 2005 10:04:23') },
     { name: 'favorite', userId: 1, createdAt: new Date('March 24, 2005 10:04:23'), updatedAt: new Date('March 24, 2005 10:04:23') },
     { name: 'nice', userId: 1, createdAt: new Date('March 24, 2005 10:04:23'), updatedAt: new Date('March 24, 2005 10:04:23') },
     { name: 'mean', userId: 1, createdAt: new Date('March 24, 2005 10:04:23'), updatedAt: new Date('March 24, 2005 10:04:23') }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Tags', null, {});
  }
};
