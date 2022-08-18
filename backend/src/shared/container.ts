import { container } from "tsyringe";
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

container.registerSingleton<UserController>("UserController", UserController);
