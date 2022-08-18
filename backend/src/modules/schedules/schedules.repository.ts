import knex from "../database/connection";
import { Schedule } from "./interfaces/schedule.interface";

export interface ScheduleRepository {
  showAllByUserId(userId: string): Promise<Schedule[]>;
}

export class ScheduleRepositoryImpl {
  showAllByUserId(userId: string): Promise<Schedule[]> {
    return knex("schedules").where("user_id", userId);
  }
}
