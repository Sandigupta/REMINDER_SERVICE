'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NotificationTicket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NotificationTicket.init({
    Subject: {
      type: DataTypes.STRING,
      allowNull:false
      
    },
    Content: {
      type: DataTypes.STRING,
      allowNull:false
    },
    recepientEmail: {
      type: DataTypes.STRING, 
      allowNull: false,
              validate: { isEmail: true }

    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["PENDING", "SUCCESS", "FAILED"],
      defaultValue:"PENDING",
    },
    notificationTime: {
      type: DataTypes.DATE,
    }
  }, {
    sequelize,
    modelName: 'NotificationTicket',
  });
  return NotificationTicket;
};