import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ScheduleServiceImpl } from './schedules.service';
import { Schedule } from './types/schedule.interface';

class ScheduleController {
  async showAll(request: Request, response: Response) {
    const scheduleService = container.resolve(ScheduleServiceImpl);

    const { user_id } = request.params;
    const schedules = await scheduleService.showAll(user_id);

    return response.json({ schedules });
  }
  async showByDate(request: Request, response: Response) {
    const scheduleService = container.resolve(ScheduleServiceImpl);
    const { user_id, date } = request.query;
    if (!user_id || !date) {
      return response.status(400);
    }

    const schedules = await scheduleService.showByDate(
      String(user_id),
      String(date)
    );
    return response.json({ schedules });
  }

  async create(request: Request, response: Response) {
    const scheduleService = container.resolve(ScheduleServiceImpl);
    const { user_id, point_id, date, description } = request.body;

    const schedule = {
      user_id,
      point_id,
      date,
      description,
    };
    const insertedIds = await scheduleService.createSchedule(
      schedule as Schedule
    );
    const id = insertedIds[0];
    return response.json({
      id,
      ...schedule,
    });
  }
}
export default ScheduleController;
