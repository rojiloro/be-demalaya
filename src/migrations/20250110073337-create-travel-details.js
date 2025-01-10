'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TravelDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TravelDetailsID: {
        type: Sequelize.INTEGER
      },
      PersonalID: {
        type: Sequelize.INTEGER
      },
      PreferredDestinations: {
        type: Sequelize.TEXT
      },
      PreferredStartDate: {
        type: Sequelize.DATE
      },
      FlexibleDates: {
        type: Sequelize.BOOLEAN
      },
      TripDurationDays: {
        type: Sequelize.INTEGER
      },
      NumberOfParticipants: {
        type: Sequelize.INTEGER
      },
      Adults: {
        type: Sequelize.INTEGER
      },
      Children: {
        type: Sequelize.INTEGER
      },
      ChildrenAges: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TravelDetails');
  }
};