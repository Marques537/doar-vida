import { Request, Response } from "express";
import { container } from "tsyringe";
import knex from "../database/connection";
import { ScheduleServiceImpl } from "./schedules.service";

class ScheduleController {
  async showAll(request: Request, response: Response) {
    const scheduleService = container.resolve(ScheduleServiceImpl);

    const { user_id } = request.params;
    const schedules = await scheduleService.showAll(user_id);

    console.log(schedules);
    return response.json({ schedules });
  }
  async showByDate(request: Request, response: Response) {
    const { user_id, date } = request.query;
    const schedules = await knex("schedules")
      .where("user_id", String(user_id))
      .where("date", ">", String(date));

    return response.json({ schedules });
  }

  async create(request: Request, response: Response) {
    const { user_id, point_id, date, description } = request.body;

    const schedule = {
      user_id,
      point_id,
      date,
      description,
    };
    const insertedIds = await knex("schedules").insert(schedule);
    const scheduleId = insertedIds[0];
    return response.json({
      scheduleId,
      ...schedule,
    });
  }
}
export default ScheduleController;
