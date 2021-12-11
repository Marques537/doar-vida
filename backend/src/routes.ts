import express, { request, response } from 'express';
import PointsController from './controllers/PointsController';
import ScheduleController from './controllers/ScheculesController';
import UserController from './controllers/UserController';
import DonationController from './controllers/DonationController';

const routes = express.Router();
const pointsController = new PointsController();
const scheduleController = new ScheduleController();
const userController = new UserController();
const donationController = new DonationController();

routes.get('/', (request, response) => {
  return response.json({
    message: 'Hello World'
  });
});

routes.get('/points/:id', pointsController.show);
routes.post('/points', pointsController.create);
routes.get('/points', pointsController.index);
routes.post('/schedule',scheduleController.create);
routes.get('/schedule/:user_id',scheduleController.showAll);
routes.get('/schedules',scheduleController.showByDate);
routes.post('/user', userController.create);// fazer autenticação, token
routes.post('/donation', donationController.create);
routes.get('/donations/:user_id', donationController.show);

export default routes;