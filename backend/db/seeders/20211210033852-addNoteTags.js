'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('NoteTags', [
      { 
       noteId: 1, tagId: 3,
      createdAt: new Date('December 6, 2005 13:24:20'),
      updatedAt: new Date('December 6, 2005 13:24:20'),
      },
      {
       noteId: 1, tagId: 4,
       createdAt: new Date('December 6, 2005 13:24:20'),
       updatedAt: new Date('December 6, 2005 13:24:20'),
      },
     {
       noteId: 2, tagId: 3,
       createdAt: new Date('May 9, 2013 10:43:32'),
       updatedAt: new Date('May 9, 2013 10:43:32'),
     },
     {
       noteId: 2, tagId: 4,
       createdAt: new Date('May 9, 2013 10:43:32'),
       updatedAt: new Date('May 9, 2013 10:43:32'),
     },
     {
       noteId: 3, tagId: 1,
       createdAt: new Date('March 24, 2005 10:04:23'),
       updatedAt: new Date('March 24, 2005 10:04:23'),
     },
     {
       noteId: 3, tagId: 2,
       createdAt: new Date('March 24, 2005 10:04:23'),
       updatedAt: new Date('March 24, 2005 10:04:23'),
     },
     {
       noteId: 3, tagId: 5,
       createdAt: new Date('March 24, 2005 10:04:23'),
       updatedAt: new Date('March 24, 2005 10:04:23'),
     },
     {
       noteId: 3, tagId: 3,
       createdAt: new Date('March 24, 2005 10:04:23'),
       updatedAt: new Date('March 24, 2005 10:04:23'),
     },
     {
       noteId: 4, tagId: 1,
       createdAt: new Date('October 1, 2012 08:09:27'),
       updatedAt: new Date('October 1, 2012 08:09:27'),
     },
     {
       noteId: 4, tagId: 2,
       createdAt: new Date('October 1, 2012 08:09:27'),
       updatedAt: new Date('October 1, 2012 08:09:27'),
     },
     {
       noteId: 4, tagId: 3,
       createdAt: new Date('October 1, 2012 08:09:27'),
       updatedAt: new Date('October 1, 2012 08:09:27'),
     },
     {
       noteId: 5, tagId: 1,
       createdAt: new Date('November 30, 2006 11:06:52'),
       updatedAt: new Date('November 30, 2006 11:06:52'),
     },
     {
       noteId: 5, tagId: 2,
       createdAt: new Date('November 30, 2006 11:06:52'),
       updatedAt: new Date('November 30, 2006 11:06:52'),
     },
     {
       noteId: 5, tagId: 5,
       createdAt: new Date('November 30, 2006 11:06:52'),
       updatedAt: new Date('November 30, 2006 11:06:52'),
     },
     {
       noteId: 6, tagId: 5,
       createdAt: new Date('January 18, 2007 10:16:47'),
       updatedAt: new Date('January 18, 2007 10:16:47'),
     },
     {
       noteId: 6, tagId: 2,
       createdAt: new Date('January 18, 2007 10:16:47'),
       updatedAt: new Date('January 18, 2007 10:16:47'),
     },
     {
       noteId: 7, tagId: 1,
       createdAt: new Date('January 18, 2007 10:16:47'),
       updatedAt: new Date('January 18, 2007 10:16:47'),
     },
     {
       noteId: 8, tagId: 1,
       createdAt: new Date('May 14, 2009 13:19:21'),
       updatedAt: new Date('May 14, 2009 13:19:21'),
     },
     {
       noteId: 8, tagId: 2,
       createdAt: new Date('May 14, 2009 13:19:21'),
       updatedAt: new Date('May 14, 2009 13:19:21'),
     },
     {
       noteId: 8, tagId: 4,
       createdAt: new Date('May 14, 2009 13:19:21'),
       updatedAt: new Date('May 14, 2009 13:19:21'),
     },
     {
       noteId: 10, tagId: 3,
       createdAt: new Date('September 20, 2012 12:31:35'),
       updatedAt: new Date('September 20, 2012 12:31:35'),
     }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('NoteTags', null, {});
  }
};
