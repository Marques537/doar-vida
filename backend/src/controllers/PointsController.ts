import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const point = await knex('points').where('id', id).first();

    if (!point) {
      return response.status(400).json({ messase: 'Collection not found' })
    }
    return response.json(point);
  }

  async post(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      street,
      number
    } = request.body;

    await knex('points').insert({
      image: 'no-image',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      street,
      number
    });
    return response.json({ sucess: true });
  }
}

export default PointsController;