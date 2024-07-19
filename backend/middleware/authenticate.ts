import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Account } from "../models/account";

declare module "express-serve-static-core" {
  interface Request {
    user?: jwt.JwtPayload;
  }
  interface JwtPayload {
    id: string;
  }
}

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(403);

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    async (err, user) => {
      if (err) return res.sendStatus(403);

      const payload = user as jwt.JwtPayload;

      const account: Account[] = await Account.findAll({
        where: { id: payload.id },
      });

      if (account.length == 0) return res.sendStatus(403);

      req.user = payload;
      next();
    }
  );
}
