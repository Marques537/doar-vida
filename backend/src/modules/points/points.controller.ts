import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CustomError } from '../../shared/CustomError';
import { PointServiceImpl } from './points.service';

class PointsController {
  async show(request: Request, response: Response) {
    const pointService = container.resolve(PointServiceImpl);
    const { id } = request.params;
    const point = await pointService.showById(id);

    if (!point) {
      return response
        .status(400)
        .json({ message: 'Collection post not found' });
    }
    return response.json(point);
  }

  async create(request: Request, response: Response) {
    const pointService = container.resolve(PointServiceImpl);
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      address,
      phoneNumber,
    } = request.body;

    const point = {
      image: undefined, //need modify during frontend development
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      address,
      phoneNumber,
    };

    if (
      point.name === undefined ||
      point.email === undefined ||
      point.whatsapp === undefined ||
      point.latitude === undefined ||
      point.longitude === undefined ||
      point.city === undefined ||
      point.uf === undefined ||
      point.address === undefined
    ) {
      return response
        .status(400)
        .json({ message: 'another property is not provided' });
    }

    const pointId = await pointService.createPoint(point);
    if (pointId instanceof CustomError) {
      return response.status(400).json(pointId);
    }
    return response.json({
      id: pointId,
      ...point,
    });
  }

  async index(request: Request, response: Response) {
    const pointService = container.resolve(PointServiceImpl);
    const { city, uf } = request.query;

    const location = {
      city: String(city),
      uf: String(uf),
    };

    const points = await pointService.findPointsByUFAndCity(location);
    return response.json({ points });
  }
}

export default PointsController;
