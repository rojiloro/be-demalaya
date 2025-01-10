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
    PersonalID: DataTypes.INTEGER,
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
  return TravelDetails;
};