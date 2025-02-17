'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Submission extends Model {
    static associate(models) {
      // Foreign key ke PersonalInformation
      Submission.belongsTo(models.PersonalInformation, { 
        foreignKey: 'PersonalID'
      });
    }
  }

  Submission.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    PersonalID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'PersonalInformation', // Pastikan tabel ini ada di database
        key: 'id'
      }
    },
    HowDidYouHear: {
      type: DataTypes.ENUM('Social Media', 'Search Engine', 'Friend', 'Other'),
      allowNull: false
    },
    Consent: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Submission',
  });

  return Submission;
};
