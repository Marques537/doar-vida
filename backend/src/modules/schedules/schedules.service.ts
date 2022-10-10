import { inject, injectable } from "tsyringe";
import { ScheduleRepository } from "./schedules.repository";
import { Schedule } from "./types/schedule.interface";

export interface ScheduleService {
  showAll(userId: string): Promise<Schedule[]>;
  showByDate(userId: string, date: string): Promise<Schedule[]>;
  createSchedule(schedule: Schedule): Promise<number[]>;
}

@injectable()
export class ScheduleServiceImpl implements ScheduleService {
  constructor(
    @inject("ScheduleRepository")
    private scheduleRepository: ScheduleRepository
  ) {}

  showAll(userId: string): Promise<Schedule[]> {
    return this.scheduleRepository.showAllByUserId(userId);
  }
  showByDate(userId: string, date: string): Promise<Schedule[]> {
    return this.scheduleRepository.showAllByUserIdAndDate(userId, date);
  }
  async createSchedule(schedule: Schedule): Promise<number[]> {
    return this.scheduleRepository.createSchedule(schedule);
  }
}
