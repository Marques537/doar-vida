import { container } from "tsyringe";
import UserController from "../modules/user/user.controller";
import {
  UserRepository,
  UserRepositoryImpl,
} from "../modules/user/user.repository";

container.registerSingleton<UserRepository>(
  "UserRepository",
  UserRepositoryImpl
);

container.registerSingleton<UserController>("UserController", UserController);
