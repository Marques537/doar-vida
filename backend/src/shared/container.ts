import { container } from "tsyringe";
import {
  DonationRepository,
  DonationRepositoryImpl,
} from "../modules/donation/donation.repository";
import {
  PointRepository,
  PointRepositoryImpl,
} from "../modules/points/points.repository";
import ScheduleController from "../modules/schedules/schedules.controller";
import {
  ScheduleRepository,
  ScheduleRepositoryImpl,
} from "../modules/schedules/schedules.repository";
import UserController from "../modules/user/user.controller";
import {
  UserRepository,
  UserRepositoryImpl,
} from "../modules/user/user.repository";

//Schedule
container.registerSingleton<ScheduleRepository>(
  "ScheduleRepository",
  ScheduleRepositoryImpl
);
container.registerSingleton<ScheduleController>(
  "ScheduleController",
  ScheduleController
);

//User
container.registerSingleton<UserRepository>(
  "UserRepository",
  UserRepositoryImpl
);

//PointsController
container.registerSingleton<PointRepository>(
  "PointRepository",
  PointRepositoryImpl
);

//Donation
container.registerSingleton<DonationRepository>(
  "DonationRepository",
  DonationRepositoryImpl
);

container.registerSingleton<UserController>("UserController", UserController);
