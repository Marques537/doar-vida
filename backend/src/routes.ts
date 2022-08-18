import { Router } from "express";
import PointsController from "./modules/points/PointsController";
import ScheduleController from "./modules/schedules/schedules.controller";
import DonationController from "./modules/donation/DonationController";
import Authenticate from "./modules/auth/AuthController";
import { container } from "tsyringe";
import UserController from "./modules/user/user.controller";

const routes = Router();
const pointsController = new PointsController();
const scheduleController = container.resolve(ScheduleController);
const userController = container.resolve(UserController);
const donationController = new DonationController();

routes.get(
  "/points/:id",
  Authenticate.ensureAuthenticated,
  pointsController.show
);
routes.post(
  "/points",
  Authenticate.ensureAuthenticated,
  pointsController.create
);
routes.get("/points", Authenticate.ensureAuthenticated, pointsController.index);
routes.post(
  "/schedule",
  Authenticate.ensureAuthenticated,
  scheduleController.create
);
routes.get(
  "/schedule/:user_id",
  Authenticate.ensureAuthenticated,
  scheduleController.showAll
);
routes.get(
  "/schedules",
  Authenticate.ensureAuthenticated,
  scheduleController.showByDate
);
routes.post("/user/sign", userController.login);
routes.post("/user", userController.create);
routes.post(
  "/donation",
  Authenticate.ensureAuthenticated,
  donationController.create
);
routes.get(
  "/donations/:user_id",
  Authenticate.ensureAuthenticated,
  donationController.show
);

export default routes;
