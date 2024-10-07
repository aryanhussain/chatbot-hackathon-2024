const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('investments', {
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
    investment_type: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    investment_amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    current_value: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0.00
    }
  }, {
    sequelize,
    tableName: 'investments',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "investments_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
