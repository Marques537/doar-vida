import { Request, Response } from "express";
import { container } from "tsyringe";
import { DonationServiceImpl } from "./donation.service";

class DonationController {
  async create(request: Request, response: Response) {
    const donationService = container.resolve(DonationServiceImpl);
    const { user_id, date, local } = request.body;
    const donation = { user_id, date, local };

    const donation_id = await donationService.createDonation(donation);
    return response.json({
      donation_id,
      ...donation,
    });
  }
  async show(request: Request, response: Response) {
    const donationService = container.resolve(DonationServiceImpl);
    const { userId } = request.params;

    const donations = await donationService.showByUserId(userId);
    return response.json({ donations });
  }
}

export default DonationController;
