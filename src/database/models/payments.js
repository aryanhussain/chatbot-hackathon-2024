const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payments', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    loan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'loans',
        key: 'id'
      }
    },
    payment_amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    payment_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    payment_status: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "Pending"
    }
  }, {
    sequelize,
    tableName: 'payments',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "payments_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
