import knex from '../database/connection';
import { Schedule } from './types/schedule.interface';

export interface ScheduleRepository {
  showAllByUserId(userId: string): Promise<Schedule[]>;
  showAllByUserIdAndDate(userId: string, date: string): Promise<Schedule[]>;
  createSchedule(schedule: Schedule): Promise<number[]>;
}

export class ScheduleRepositoryImpl {
  showAllByUserId(userId: string): Promise<Schedule[]> {
    return knex('schedules').where('user_id', userId);
  }
  showAllByUserIdAndDate(userId: string, date: string): Promise<Schedule[]> {
    return knex('schedules')
      .where('user_id', userId)
      .where('date', '>', date)
      .orderBy('date');
  }
  createSchedule(schedule: Schedule): Promise<number[]> {
    return knex('schedules').insert(schedule).returning(['id']);
  }
}
