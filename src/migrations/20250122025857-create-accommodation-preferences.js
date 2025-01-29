'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AccommodationPreferences', {
      AccommodationID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      TravelDetailsID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'TravelDetails', // Nama tabel referensi
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      PreferredAccommodationType: {
        type: Sequelize.ENUM('Luxury', 'Budget'),
        allowNull: false,
      },
      RoomType: {
        type: Sequelize.ENUM('Single', 'Double', 'Suite'),
        allowNull: false,
      },
      SpecialAccommodationRequests: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('AccommodationPreferences');
  },
};
