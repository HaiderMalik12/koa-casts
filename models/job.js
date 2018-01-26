'use strict';
module.exports = (sequelize, DataTypes) => {
    var Job = sequelize.define('Job', {
        title: DataTypes.STRING
    });

    Job.associate = (models) => {
        Job.belongsTo(models.Company, {
            foreignKey: {
                allowNull: false
            }
        });
        Job.belongsToMany(models.Candidate,{
            through: 'Application'
        })
    };
    return Job;
};