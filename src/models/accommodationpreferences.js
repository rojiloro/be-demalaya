'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AccommodationPreferences extends Model {
    static associate(models) {
      // Define association here
      AccommodationPreferences.belongsTo(models.TravelDetails, {
        foreignKey: 'TravelDetailsID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  AccommodationPreferences.init(
    {
      AccommodationID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      TravelDetailsID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'TravelDetails',
          key: 'id',
        },
      },
      PreferredAccommodationType: {
        type: DataTypes.ENUM('Luxury', 'Budget'),
        allowNull: false,
      },
      RoomType: {
        type: DataTypes.ENUM('Single', 'Double', 'Suite'),
        allowNull: false,
      },
      SpecialAccommodationRequests: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'AccommodationPreferences',
      tableName: 'AccommodationPreferences',
      timestamps: true,
    }
  );

  return AccommodationPreferences;
};
