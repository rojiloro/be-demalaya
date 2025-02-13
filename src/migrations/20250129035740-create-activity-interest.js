'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ActivityInterests', {
      ActivityID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      TravelDetailsID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'TravelDetails', // Nama tabel yang direferensikan
          key: 'id', // Kolom yang direferensikan
        },
      },
      PreferredActivities: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      ActivityLevel: {
        type: Sequelize.ENUM('Relaxed', 'Moderate', 'Adventurous'),
        allowNull: false,
      },
      SpecialInterests: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ActivityInterests');
  },
};