const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employment_details', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      unique: "unique_user_company"
    },
    company_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "unique_user_company"
    },
    salary_employee: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    work_experience_years: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    designation: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    employment_start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    employment_end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "Active"
    }
  }, {
    sequelize,
    tableName: 'employment_details',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "employmentdetails_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "unique_user_company",
        unique: true,
        fields: [
          { name: "user_id" },
          { name: "company_name" },
        ]
      },
    ]
  });
};
