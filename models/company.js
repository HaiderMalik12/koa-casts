'use strict';
module.exports = (sequelize, DataTypes) => {
    var Company = sequelize.define('Company', {
        name: DataTypes.STRING,
        city: DataTypes.STRING,
        address: DataTypes.STRING
    });

    Company.associate = models => {
        Company.hasMany(models.Job);
        Company.belongsTo(models.User);
    };
    return Company;
};