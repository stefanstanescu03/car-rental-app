import express, { Request, Response, Router } from "express";
import { authenticateToken } from "../middleware/authenticate";
import { v4 as uuidv4 } from "uuid";

import { Rent, RentAtt } from "../models/rent";
import { Vehicle } from "../models/vehicle";

const router: Router = express.Router();

router.get("/test", async (req: Request, res: Response) => {
  try {
    res.status(200).send({ status: "Hello there!" });
  } catch (err) {
    res.status(400).send({ error: (err as Error).message });
  }
});

router.post(
  "/create",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const user_id: string = req.user?.id;

      const vehicle: Vehicle | null = await Vehicle.findOne({
        where: { id: req.body.vehicle_id },
      });

      if (!vehicle) {
        return res.status(404).send({ status: "vehicle not found" });
      }
      if (!vehicle?.dataValues.available) {
        return res.status(200).send({ status: "vehicle not available" });
      }

      const rent_date: Date = new Date(req.body.rent_date);
      const return_date: Date = new Date(req.body.return_date);

      const new_rent: RentAtt = {
        id: uuidv4(),
        account_id: user_id,
        vehicle_id: req.body.vehicle_id,
        rent_date: rent_date,
        return_date: return_date,
        rent_location: vehicle?.dataValues.location as string,
        return_location: req.body.return_location,
        total_price:
          req.body.days * (vehicle?.dataValues.price_per_day as number),
      };

      await Rent.create(new_rent);

      await Vehicle.update(
        { available: false },
        { where: { id: new_rent.vehicle_id } }
      );

      res.status(200).send({ status: "vehicle rented", rent_info: new_rent });
    } catch (err) {
      res.status(400).send({ error: (err as Error).message });
    }
  }
);

router.delete(
  "/delete",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const rent_id: string = req.body.rent_id;

      const rent: Rent | null = await Rent.findOne({ where: { id: rent_id } });

      if (!rent) {
        return res.status(404).send({ status: "rent not found" });
      }

      await Vehicle.update(
        { available: true, location: rent.dataValues.return_location },
        {
          where: {
            id: rent.dataValues.vehicle_id,
          },
        }
      );

      await Rent.destroy({ where: { id: rent_id } });

      res.status(200).send({ status: "vehicle rent deleted" });
    } catch (err) {
      res.status(400).send({ error: (err as Error).message });
    }
  }
);

export default router;
