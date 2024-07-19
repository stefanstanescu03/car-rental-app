import express, { Router, Request, Response } from "express";
import { Account } from "../models/account";
import { v4 as uuidv4 } from "uuid";

import { scryptSync, randomBytes, timingSafeEqual } from "crypto";
import { sign } from "jsonwebtoken";
import { Token } from "../models/token";
import { authenticateToken } from "../middleware/authenticate";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    res.status(200).send({ message: "Hello, welcome to account route!" });
  } catch (err) {
    res.status(400).send({ error: (err as Error).message });
  }
});

router.get("/test", authenticateToken, async (req: Request, res: Response) => {
  try {
    res.status(200).send({ status: req.user });
  } catch (err) {
    res.status(400).send({ error: (err as Error).message });
  }
});

router.post("/create", async (req: Request, res: Response) => {
  try {
    const id = uuidv4();

    const user = req.body;

    const accounts: Account[] = await Account.findAll({
      where: { email: req.body.email },
    });

    if (accounts.length == 0) {
      const salt: string = randomBytes(16).toString("hex");
      const hashedPassword = scryptSync(user.password, salt, 64).toString(
        "hex"
      );
      user.password = `${salt}:${hashedPassword}`;

      const record: Account = await Account.create({ ...req.body, id });
      return res
        .status(200)
        .send({ status: "account created", record: record });
    } else {
      res.status(400).send({ error: "email already exists" });
    }
  } catch (err) {
    res.status(400).send({ error: (err as Error).message });
  }
});

router.get("/login", async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email;
    const password: string = req.body.password;

    const record: Account | null = await Account.findOne({
      where: { email: email },
    });

    if (!record) {
      res.status(200).send({ status: "account not found" });
    } else {
      const [salt, key] = record.dataValues.password.split(":");
      const hashedPassword = scryptSync(password, salt, 64);

      const keyBuffer: Buffer = Buffer.from(key, "hex");
      const match = timingSafeEqual(hashedPassword, keyBuffer);

      if (match) {
        const user: Token = {
          id: record.dataValues.id,
          first_name: record.dataValues.first_name,
          last_name: record.dataValues.last_name,
          email: record.dataValues.email,
          phone_number: record.dataValues.phone_number,
        };

        const token = sign(user, process.env.ACCESS_TOKEN_SECRET as string, {
          expiresIn: "24h",
        });
        res.status(200).send({ status: "account authenticated", token: token });
      } else {
        res.status(200).send({ status: "incorrect" });
      }
    }
  } catch (err) {
    res.status(400).send({ error: (err as Error).message });
  }
});

router.put(
  "/modify",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const id: string = req.user?.id;

      await Account.update(
        {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          phone_number: req.body.phone_number,
        },
        { where: { id: id } }
      );

      res.status(200).send({ status: "account updated" });
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
      const id: string = req.user?.id;

      await Account.destroy({ where: { id: id } });
      res.status(200).send({ status: "account deleted" });
    } catch (err) {
      res.status(400).send({ error: (err as Error).message });
    }
  }
);

export default router;
