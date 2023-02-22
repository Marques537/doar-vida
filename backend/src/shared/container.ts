import { container } from 'tsyringe';
import DonationController from '../modules/donation/donation.controller';
import {
  DonationRepository,
  DonationRepositoryImpl,
} from '../modules/donation/donation.repository';
import { DonationServiceImpl } from '../modules/donation/donation.service';
import PointsController from '../modules/points/points.controller';
import {
  PointRepository,
  PointRepositoryImpl,
} from '../modules/points/points.repository';
import ScheduleController from '../modules/schedules/schedules.controller';
import {
  ScheduleRepository,
  ScheduleRepositoryImpl,
} from '../modules/schedules/schedules.repository';
import UserController from '../modules/user/user.controller';
import {
  UserRepository,
  UserRepositoryImpl,
} from '../modules/user/user.repository';

//Schedule
container.registerSingleton<ScheduleRepository>(
  'ScheduleRepository',
  ScheduleRepositoryImpl
);
container.registerSingleton<ScheduleController>(
  'ScheduleController',
  ScheduleController
);

//User
container.registerSingleton<UserRepository>(
  'UserRepository',
  UserRepositoryImpl
);
container.registerSingleton<UserController>('UserController', UserController);

//PointsController
container.registerSingleton<PointRepository>(
  'PointRepository',
  PointRepositoryImpl
);
container.registerSingleton<PointsController>(
  'PointsController',
  PointsController
);
//Donation
container.registerSingleton<DonationController>(
  'DonationController',
  DonationController
);
container.registerSingleton<DonationRepository>(
  'DonationService',
  DonationServiceImpl
);

container.registerSingleton<DonationRepository>(
  'DonationRepository',
  DonationRepositoryImpl
);
