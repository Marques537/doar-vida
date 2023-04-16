import { Router } from 'express';
import PointsController from './modules/points/points.controller';
import ScheduleController from './modules/schedules/schedules.controller';
import DonationController from './modules/donation/donation.controller';
import Authenticate from './modules/auth/AuthController';
import { container } from 'tsyringe';
import UserController from './modules/user/user.controller';

const routes = Router();
const pointsController = container.resolve(PointsController);
const scheduleController = container.resolve(ScheduleController);
const userController = container.resolve(UserController);
const donationController = container.resolve(DonationController);

routes.get(
  '/points/:id',
  Authenticate.ensureAuthenticated,
  pointsController.show
);
routes.post(
  '/points',
  Authenticate.ensureAuthenticated,
  pointsController.create
);
routes.get('/points', Authenticate.ensureAuthenticated, pointsController.index);
routes.post(
  '/schedules',
  Authenticate.ensureAuthenticated,
  scheduleController.create
);
routes.get(
  '/schedules/:user_id',
  Authenticate.ensureAuthenticated,
  scheduleController.showAll
);
routes.get(
  '/schedules',
  Authenticate.ensureAuthenticated,
  scheduleController.showByDate
);
routes.post('/user/sign', userController.login);
routes.post('/user', userController.create);
routes.get(
  '/user/:userId',
  Authenticate.ensureAuthenticated,
  userController.getUser
);
routes.post(
  '/user/update',
  Authenticate.ensureAuthenticated,
  userController.updateUser
);
routes.post(
  '/user/update/password',
  Authenticate.ensureAuthenticated,
  userController.updatePassword
);

routes.post(
  '/donation',
  Authenticate.ensureAuthenticated,
  donationController.create
);
routes.get(
  '/donations/:userId',
  Authenticate.ensureAuthenticated,
  donationController.show
);

export default routes;
