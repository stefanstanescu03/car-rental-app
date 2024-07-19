import { Sequelize } from "sequelize";

const db = new Sequelize("app", "", "", {
  dialect: "sqlite",
  storage: "./car-rental.db",
  logging: false,
});

export default db;
