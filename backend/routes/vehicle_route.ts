import express, { Request, Response, Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { Vehicle } from "../models/vehicle";
import { Account } from "../models/account";
import { authenticateToken } from "../middleware/authenticate";

const router: Router = express.Router();

router.get(
  "/create",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const account = await Account.findOne({ where: { id: req.user?.id } });
      if (!account?.dataValues.admin) {
        return res.sendStatus(403);
      }

      const id = uuidv4();

      const record = await Vehicle.create({ ...req.body, id });

      return res
        .status(200)
        .send({ status: "vehicle created", record: record });
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
      const id = req.body.id;

      const account = await Account.findOne({ where: { id: req.user?.id } });
      if (!account?.dataValues.admin) {
        return res.sendStatus(403);
      }

      await Vehicle.destroy({ where: { id: id } });
      res.status(200).send({ status: "vehicle deleted" });
    } catch (err) {
      res.status(400).send({ error: (err as Error).message });
    }
  }
);

export default router;
