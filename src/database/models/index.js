'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config') //'/../config/config.js');  // Load the configuration [env]
const db = {};

let sequelize;
sequelize = new Sequelize(config.url, config);
// if (config.use_env_variable) {
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// Dynamically load all models in the models folder
fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// If you have any associations (relations between models), this sets them up
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
