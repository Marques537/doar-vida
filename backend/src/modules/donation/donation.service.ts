import { inject, injectable } from "tsyringe";
import { CustomError } from "../../shared/CustomError";
import { DonationRepository } from "./donation.repository";
import { Donation } from "./types/donation.interface";
import { CreateDonationDto } from "./types/dto/CreateDonation.dto";

export interface DonationService {
  showByUserId(userId: string): Promise<Donation[]>;
  createDonation(donation: CreateDonationDto): Promise<number>;
}

@injectable()
export class DonationServiceImpl implements DonationService {
  constructor(
    @inject("DonationRepository")
    private donationRepository: DonationRepository
  ) {}
  async showByUserId(userId: string): Promise<Donation[]> {
    return this.donationRepository.showByUserId(userId);
  }
  async createDonation(donation: CreateDonationDto): Promise<number> {
    return this.donationRepository.createDonation(donation);
  }
}
