import { Model, DataTypes } from "sequelize";
import db from "../config/database.config";

interface VehicleAtt {
  id: string;
  car_model: string;
  price_per_day: Number;
  type: string;
  transmission: string;
  seats: Number;
  capacity: string;
  supplier: string;
  location: string;
  available: Boolean;
}

export class Vehicle extends Model<VehicleAtt> {}

Vehicle.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    car_model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price_per_day: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transmission: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seats: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    supplier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "vehicles",
  }
);
