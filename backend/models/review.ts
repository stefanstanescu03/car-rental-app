import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";

interface ReviewAtt {
  id: string;
  vehicle_id: string;
  account_id: string;
  rating: Number;
}

export class Review extends Model<ReviewAtt> {}

Review.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    vehicle_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    account_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "reviews",
  }
);
