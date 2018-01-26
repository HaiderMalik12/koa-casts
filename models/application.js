'use strict';
module.exports = (sequelize, DataTypes) => {
  var Application = sequelize.define('Application', {
    status_id: DataTypes.INTEGER
  });
  return Application;
};