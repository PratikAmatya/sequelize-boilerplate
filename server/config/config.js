require("dotenv").config({ path: "../../.env" });

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      connectTimeout: 3000,
      dateStrings: true,
      typeCast: true,
    },
    timezone: "+07:00",
    pool: {
      max: 10,
      min: 0,
      acquire: 60000,
    },
  },
  staging: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      connectTimeout: 3000,
      dateStrings: true,
      typeCast: true,
    },
    timezone: "+07:00",
    pool: {
      max: 10,
      min: 0,
      acquire: 60000,
    },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      connectTimeout: 3000,
      dateStrings: true,
      typeCast: true,
    },
    timezone: "+07:00",
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 60000,
    },
  },
};
