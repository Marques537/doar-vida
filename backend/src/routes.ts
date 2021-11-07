import express, { request, response } from 'express';
import knex from './database/connection';
import PointsController from './controllers/PointsController';

const routes = express.Router();
const pointsController = new PointsController();

routes.get('/', (request, response) => {
  return response.json({
    message: 'Hello World'
  });
});

routes.get('/points/:id', pointsController.show);

routes.post('/points', pointsController.post);

export default routes;