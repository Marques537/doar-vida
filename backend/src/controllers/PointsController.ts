import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const point = await knex('points').where('id', id).first();

    if (!point) {
      return response.status(400).json({ message: 'Collection post not found' })
    }
    return response.json(point);
  };

  async create(request: Request, response: Response) {
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

    const point = {
      image: 'no-image',//need modify during frontend development
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      street,
      number
    };

    if (
      point.image === undefined ||
      point.name === undefined ||
      point.email === undefined ||
      point.whatsapp === undefined ||
      point.latitude === undefined ||
      point.longitude === undefined ||
      point.city === undefined ||
      point.uf === undefined ||
      point.street === undefined ||
      point.number === undefined) {
      return response.status(400).json({ message: 'another property is not provided' })
    }
    const insertedIds = await knex('points').insert(point);
    const point_id = insertedIds[0];
    return response.json({
      id: point_id,
      ...point,
    });
  };

  async index(request: Request, response: Response) {
    const { city, uf } = request.query;

    const points = await knex('points')
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
    return response.json({ points });
  };
};

export default PointsController;