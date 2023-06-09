import knex from '../database/connection';
import { CreatePointDto } from './types/dto/createPoint.dto';
import { FindPointsDto } from './types/dto/findPoints.dto';
import { Point } from './types/point.interface';

export interface PointRepository {
  showById(pointId: string): Promise<Point>;
  create(point: CreatePointDto): Promise<number>;
  findPointsByUFAndCity(location: FindPointsDto): Promise<Point[]>;
  findPointsByUF(uf: string): Promise<Point[]>;
}

export class PointRepositoryImpl implements PointRepository {
  async showById(pointId: string): Promise<Point> {
    return knex('points').where('id', pointId).first();
  }
  async create(point: CreatePointDto): Promise<number> {
    const {
      name,
      image,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      address,
      phoneNumber,
    } = point;

    const PointRecord = {
      name,
      image,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      address,
      phone_number: phoneNumber,
    };

    const id = await knex('points').insert(PointRecord).returning('id');
    return id[0];
  }
  async findPointsByUFAndCity(location: Point): Promise<Point[]> {
    return knex('points')
      .whereRaw('LOWER(city) = ?', location.city.toLowerCase())
      .whereRaw('LOWER(uf) = ?', location.uf.toLowerCase())
      .distinct();
  }

  async findPointsByUF(uf: string): Promise<Point[]> {
    return knex('points')
      .whereRaw('LOWER(uf) = ?', uf.toLowerCase())
      .distinct();
  }
}
