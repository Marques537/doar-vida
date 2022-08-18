import { inject, injectable } from "tsyringe";
import { ScheduleRepository } from "./schedules.repository";
import { Schedule } from "./interfaces/schedule.interface";

export interface ScheduleService {
  showAll(userId: string): Promise<Schedule[]>;
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
}
