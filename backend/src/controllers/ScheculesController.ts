import { Request, Response } from 'express';
import knex  from '../database/connection';

class ScheduleController {
  async showAll(request: Request, response: Response){
    const { user_id } = request.params;
    const schedules = await knex('schedules').where('user_id', user_id);

    return response.json({schedules});
  } 
  async showByDate(request: Request, response: Response){
    const { user_id, date } = request.query;
    const schedules = await knex('schedules').where('user_id', String(user_id)).where('date', '>' , String(date));

    return response.json({schedules});
  } 
  
  async create(request: Request, response: Response){
    const {
      user_id,
      point_id,
      date,
      description,
    } = request.body;

    const schedule = {
      user_id,
      point_id,
      date,
      description, 
    }
    const insertedIds = await knex('schedules').insert(schedule);
    const scheduleId = insertedIds[0];
    return response.json({
      scheduleId,
      ...schedule
    });
    
  };
};
export default ScheduleController;