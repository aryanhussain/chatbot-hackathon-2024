require('dotenv').config();  // Load environment variables from .env file
const { Sequelize } = require('sequelize');

// Use the DATABASE_URL from the environment variable
const sequelize = {
    url: process.env.DB_URL,
    dialect: "postgres",
    define: {
      underscored: true,
      underscoredAll: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    },
    dialectOptions: {
      ssl: {
        // require: true, // This will help you. But you will see nwe error
        rejectUnauthorized: false, // This line will fix new error
      },
    },
    logging: false, // Disable SQL query logging
    pool: {
      // acquire: 120000,
      idle: 10000
    }
}


module.exports = sequelize;
