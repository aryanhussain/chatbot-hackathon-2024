var DataTypes = require("sequelize").DataTypes;
var _accounts = require("./accounts");
var _beneficiary = require("./beneficiary");
var _employment_details = require("./employment_details");
var _investments = require("./investments");
var _loans = require("./loans");
var _payments = require("./payments");
var _transactions = require("./transactions");
var _users = require("./users");

function initModels(sequelize) {
  var accounts = _accounts(sequelize, DataTypes);
  var beneficiary = _beneficiary(sequelize, DataTypes);
  var employment_details = _employment_details(sequelize, DataTypes);
  var investments = _investments(sequelize, DataTypes);
  var loans = _loans(sequelize, DataTypes);
  var payments = _payments(sequelize, DataTypes);
  var transactions = _transactions(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  beneficiary.belongsTo(accounts, { as: "account", foreignKey: "account_id"});
  accounts.hasMany(beneficiary, { as: "beneficiaries", foreignKey: "account_id"});
  transactions.belongsTo(accounts, { as: "account", foreignKey: "account_id"});
  accounts.hasMany(transactions, { as: "transactions", foreignKey: "account_id"});
  payments.belongsTo(loans, { as: "loan", foreignKey: "loan_id"});
  loans.hasMany(payments, { as: "payments", foreignKey: "loan_id"});
  accounts.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(accounts, { as: "accounts", foreignKey: "user_id"});
  beneficiary.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(beneficiary, { as: "beneficiaries", foreignKey: "user_id"});
  employment_details.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(employment_details, { as: "employment_details", foreignKey: "user_id"});
  investments.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(investments, { as: "investments", foreignKey: "user_id"});
  loans.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(loans, { as: "loans", foreignKey: "user_id"});
  transactions.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(transactions, { as: "transactions", foreignKey: "user_id"});

  return {
    accounts,
    beneficiary,
    employment_details,
    investments,
    loans,
    payments,
    transactions,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
