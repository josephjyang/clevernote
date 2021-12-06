'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Users', [
     {
       email: 'jim.halpert@dundermifflin.com',
       username: 'jimhalpert',
       firstName: 'Jim',
       lastName: 'Halpert',
       hashedPassword: bcrypt.hashSync('password'),
       createdAt: new Date('March 24, 2005 09:03:22'),
       updatedAt: new Date('March 24, 2005 09:03:22')
     },
     {
       email: faker.internet.email(),
       username: 'FakeUser1',
       firstName: 'Fake',
       lastName: 'User1',
       hashedPassword: bcrypt.hashSync(faker.internet.password()),
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       email: faker.internet.email(),
       username: 'FakeUser2',
       firstName: 'Fake',
       lastName: 'User2',
       hashedPassword: bcrypt.hashSync(faker.internet.password()),
       createdAt: new Date(),
       updatedAt: new Date()
     }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    const Op = Sequelize.Op
    return queryInterface.bulkDelete('Users', null
    // { 
    //   username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    // }
    , {});
  }
};
