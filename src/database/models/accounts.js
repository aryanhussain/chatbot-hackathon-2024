const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('accounts', {
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
    account_number: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "accounts_account_number_key"
    },
    account_type: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    balance: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0.00
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "Active"
    }
  }, {
    sequelize,
    tableName: 'accounts',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "accounts_account_number_key",
        unique: true,
        fields: [
          { name: "account_number" },
        ]
      },
      {
        name: "accounts_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
