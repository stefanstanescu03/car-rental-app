import express, { Request, Response } from "express";
import dotenv from "dotenv";
import db from "./config/database.config";

import account_route from "./routes/account_route";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

db.sync().then(() => console.log("Connected to database"));

app.use(express.json());

app.use("/account", account_route);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello There");
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
