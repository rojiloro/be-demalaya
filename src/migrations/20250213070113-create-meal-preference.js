'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MealPreferences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TravelDetailsID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'TravelDetails', // Name of the referenced table
          key: 'id' // Primary key in TravelDetails
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      DietaryRestrictions: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      MealPlanPreferences: {
        type: Sequelize.ENUM('All-inclusive', 'Vegetarian', 'Vegan', 'Halal', 'Kosher', 'None'),
        allowNull: false
      },
      SpecialFoodRequests: {
        type: Sequelize.TEXT,
        allowNull: false
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
    await queryInterface.dropTable('MealPreferences');
  }
};
