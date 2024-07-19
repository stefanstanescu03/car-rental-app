import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";

interface AccountAtt {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
}

export class Account extends Model<AccountAtt> {}

Account.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "accounts",
  }
);
