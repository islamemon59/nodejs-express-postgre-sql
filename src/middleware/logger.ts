import { NextFunction, Request, Response } from "express";

//logger middleware
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `[${new Date().toISOString()}] method ${req.method} path ${req.path}`
  );
  next();
};

export default logger;
