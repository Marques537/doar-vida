import knex from '../database/connection';
import { Donation } from './types/donation.interface';
import { CreateDonationDto } from './types/dto/CreateDonation.dto';

export interface DonationRepository {
  createDonation(donation: CreateDonationDto): Promise<number>;
  showByUserId(userId: string): Promise<Donation[]>;
}

export class DonationRepositoryImpl implements DonationRepository {
  async showByUserId(userId: string): Promise<Donation[]> {
    return knex('donations').where('user_id', userId);
  }
  async createDonation(donation: CreateDonationDto): Promise<number> {
    const id = await knex('donations').insert(donation).returning('id');
    return id[0];
  }
}
