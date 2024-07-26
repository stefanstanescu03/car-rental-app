import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";

export interface RentAtt {
  id: string;
  account_id: string;
  vehicle_id: string;
  rent_date: Date;
  return_date: Date;
  rent_location: string;
  return_location: string;
  total_price: Number;
}

export class Rent extends Model<RentAtt> {}

Rent.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    account_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rent_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    return_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    rent_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    return_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    vehicle_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "rents",
  }
);
