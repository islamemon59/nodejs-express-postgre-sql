// auth middleware with higher order function
// higher order function will can return a function also get parameter a function;

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...role: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return;
      }
      const decoded = jwt.verify(
        token,
        config.jwt_secret as string
      ) as JwtPayload;
      console.log({ authToken: token });
      console.log({ decoded });
      req.user = decoded;

      if (role.length && !role.includes(decoded.role as string)) {
        res.status(500).json({ success: false, message: "unauthorized" });
      }
      next();
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
};

export default auth;
