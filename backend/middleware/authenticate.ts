import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user?: jwt.JwtPayload;
  }
  interface JwtPayload {
    id: string;
  }
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).send({ status: "no auth token" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user as jwt.JwtPayload;
    next();
  });
}
