'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TravelDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TravelDetails.init({
    TravelDetailsID: DataTypes.INTEGER,
    PersonalID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'PersonalInformation', 
        key: 'id',
      }
    },
    PreferredDestinations: DataTypes.TEXT,
    PreferredStartDate: DataTypes.DATE,
    FlexibleDates: DataTypes.BOOLEAN,
    TripDurationDays: DataTypes.INTEGER,
    NumberOfParticipants: DataTypes.INTEGER,
    Adults: DataTypes.INTEGER,
    Children: DataTypes.INTEGER,
    ChildrenAges: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'TravelDetails',
  });

  TravelDetails.associate = (models) => {
    TravelDetails.belongsTo(models.PersonalInformation, {
      foreignKey: 'PersonalID', // Kolom foreign key di TravelDetails
      as: 'personalInfo',      // Alias untuk relasi
    });
  };
  return TravelDetails;
};