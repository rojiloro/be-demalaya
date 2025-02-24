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
      // One-to-One dengan User
      PersonalInformation.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  PersonalInformation.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Sesuai nama tabel
        key: 'id'
      }
    },fullname: {
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