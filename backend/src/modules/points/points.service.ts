import { inject, injectable } from 'tsyringe';
import { CustomError } from '../../shared/CustomError';
import { PointRepository } from './points.repository';
import { CreatePointDto } from './types/dto/createPoint.dto';
import { FindPointsDto } from './types/dto/findPoints.dto';
import { Point } from './types/point.interface';

export interface PointService {
  showById(pointId: string): Promise<Point>;
  createPoint(point: CreatePointDto): Promise<number | CustomError>;
  findPointsByUFAndCity(location: FindPointsDto): Promise<Point[]>;
}

@injectable()
export class PointServiceImpl implements PointService {
  constructor(
    @inject('PointRepository')
    private pointRepository: PointRepository
  ) {}

  async showById(pointId: string): Promise<Point> {
    return this.pointRepository.showById(pointId);
  }
  async createPoint(point: CreatePointDto): Promise<number | CustomError> {
    try {
      return this.pointRepository.create(point);
    } catch (error: any) {
      throw new CustomError('Error to create point', error);
    }
  }
  async findPointsByUFAndCity(location: FindPointsDto): Promise<Point[]> {
    return this.pointRepository.findPointsByUFAndCity(location);
  }
}
