import express, { Request, Response, Router } from "express";
import { Review } from "../models/review";
import { authenticateToken } from "../middleware/authenticate";
import { Vehicle } from "../models/vehicle";
import { v4 as uuidv4 } from "uuid";

const router: Router = express.Router();

router.get("/:vehicle_id", async (req: Request, res: Response) => {
  try {
    const { vehicle_id } = req.params;
    const reviews: Review[] = await Review.findAll({
      where: { vehicle_id: vehicle_id },
    });
    res.status(200).send({ reviews: reviews });
  } catch (err) {
    res.status(400).send({ error: (err as Error).message });
  }
});

router.post(
  "/create",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const rating = req.body.rating;
      const vehicle_id = req.body.vehicle_id;
      const account_id = req.user?.id;
      if (!Number(rating)) {
        return res.status(400).send({ error: "rating not a number" });
      }

      const vehicle: Vehicle | null = await Vehicle.findOne({
        where: { id: vehicle_id },
      });

      const reviews: Review[] | null = await Review.findAll({
        where: { vehicle_id: vehicle_id, account_id: account_id },
      });

      if (reviews.length != 0) {
        return res.status(400).send({ error: "already reviewed" });
      }

      if (!vehicle) {
        return res.status(404).send({ error: "vehicle not found" });
      }

      await Review.create({
        id: uuidv4(),
        vehicle_id: vehicle_id,
        account_id: account_id,
        rating: rating,
      });

      res.status(200).send({ status: "review added" });
    } catch (err) {
      res.status(400).send({ error: (err as Error).message });
    }
  }
);

export default router;
