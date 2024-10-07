const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('loans', {
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
      }
    },
    loan_type: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    loan_amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    interest_rate: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    loan_term: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "Pending"
    }
  }, {
    sequelize,
    tableName: 'loans',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "loans_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
