const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('beneficiary', {
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
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'accounts',
        key: 'id'
      }
    },
    beneficiary_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    relationship: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'beneficiary',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "beneficiary_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
