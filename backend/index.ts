import express from "express";
import dotenv from "dotenv";
import db from "./config/database.config";

import account_route from "./routes/account_route";
import vehicle_router from "./routes/vehicle_route";
import rent_router from "./routes/rent_route";
import review_router from "./routes/review_route";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

db.sync().then(() => console.log("Connected to database"));

app.use(express.json());

app.use("/account", account_route);
app.use("/vehicle", vehicle_router);
app.use("/rent", rent_router);
app.use("/review", review_router);

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
