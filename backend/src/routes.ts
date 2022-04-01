import { Router } from 'express';
import PointsController from './controllers/PointsController';
import ScheduleController from './controllers/ScheculesController';
import UserController from './controllers/UserController';
import DonationController from './controllers/DonationController';
import Authenticate from './controllers/AuthController'

const routes = Router();
const pointsController = new PointsController();
const scheduleController = new ScheduleController();
const userController = new UserController();
const donationController = new DonationController();

routes.get('/points/:id', Authenticate.ensureAuthenticated, pointsController.show);
routes.post('/points', Authenticate.ensureAuthenticated,pointsController.create);
routes.get('/points', Authenticate.ensureAuthenticated,pointsController.index);
routes.post('/schedule', Authenticate.ensureAuthenticated,scheduleController.create);
routes.get('/schedule/:user_id', Authenticate.ensureAuthenticated, scheduleController.showAll);
routes.get('/schedules', Authenticate.ensureAuthenticated, scheduleController.showByDate);
routes.post('/user/sign', userController.login); 
routes.post('/user', userController.create);
routes.post('/donation', Authenticate.ensureAuthenticated, donationController.create);
routes.get('/donations/:user_id', Authenticate.ensureAuthenticated, donationController.show);

export default routes;