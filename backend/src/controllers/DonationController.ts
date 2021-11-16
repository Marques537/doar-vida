import { Request, Response } from 'express';
import knex from '../database/connection';

class DonationController {
  async create(request: Request, response: Response){
    const { user_id, date, local } = request.body;
    const donation = { user_id, date, local};

    const insertedID = await knex('donation').insert(donation);
    const donation_id = insertedID[0];
    return response.json({
      donation_id,
      ...donation
    })
  };
  async show(request: Request, response: Response){
    const{ user_id } = request.params;
    const donations = await knex('donation').where('user_id', user_id);
    return response.json({donations});
  }


};

export default DonationController;