'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PersonalInformation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PersonalInformation.init({
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    phonenumber: DataTypes.INTEGER,
    PreferredContactMethod: DataTypes.ENUM('Email', 'Phone', 'WhatsApp', 'Other')
  }, {
    sequelize,
    modelName: 'PersonalInformation',
  });
  return PersonalInformation;
};