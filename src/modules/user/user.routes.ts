import express from "express";
import { userControllers } from "./user.controller";
import logger from "../../middleware/logger";
import auth from "../../middleware/auth";
const router = express.Router();

//app.use("/users", userRoutes)

// routes -> controller -> service

//router app.post("/users  ayta hocche users er root route"/" root path")
router.post("/", userControllers.createUser);

// users get root route "/" root path
router.get("/", logger, auth("admin"), userControllers.getUser);

// user single get route
router.get(
  "/:id",
  logger,
  auth("admin", "user"),
  userControllers.getSingleUser
);

// update single user
router.put("/:id", userControllers.updateSingleUser);

// delete single user
router.delete("/:id", userControllers.deleteSingleUser);

export const userRoutes = router;
