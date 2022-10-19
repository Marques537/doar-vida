import knex from "../database/connection";
import { CreatePointDto } from "./types/dto/createPoint.dto";
import { FindPointsDto } from "./types/dto/findPoints.dto";
import { Point } from "./types/point.interface";

export interface PointRepository {
  showById(pointId: string): Promise<Point>;
  create(point: CreatePointDto): Promise<number>;
  findPointsByUFAndCity(location: FindPointsDto): Promise<Point[]>;
}

export class PointRepositoryImpl implements PointRepository {
  async showById(pointId: string): Promise<Point> {
    return knex("points").where("id", pointId).first();
  }
  async create(point: CreatePointDto): Promise<number> {
    const id = await knex("points").insert(point);
    return id[0];
  }
  async findPointsByUFAndCity(location: Point): Promise<Point[]> {
    return knex("points")
      .where("city", String(location.city))
      .where("uf", String(location.uf))
      .distinct();
  }
}
