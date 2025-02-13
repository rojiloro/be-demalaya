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
    fullname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phonenumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    PreferredContactMethod: {
      type: DataTypes.ENUM('Email', 'Phone', 'WhatsApp', 'Other'),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'PersonalInformation',
  });
  return PersonalInformation;
};