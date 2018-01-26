'use strict';
module.exports = (sequelize, DataTypes) => {
  var Company = sequelize.define('Company', {
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Company;
};