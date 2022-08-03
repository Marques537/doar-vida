import { Request, Response } from "express";
import knex from "../database/connection";
import Authenticate from "../auth/AuthController";
import { UserServiceImpl } from "./user.service";
import { container } from "tsyringe";
import { CustomError } from "../../shared/CustomError";

class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const userService = container.resolve(UserServiceImpl);

    const { name, email, password } = request.body;
    try {
      const result = await userService.create({ name, email, password });
      if (result instanceof CustomError) {
        return response.status(400).json(result);
      }
      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(400).json(error);
    }
  }
  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    if (email === undefined || password === undefined) {
      return response
        .status(400)
        .json({ message: "user or password not provided." });
    }

    const userId = await knex
      .select("id")
      .from<Object>("users")
      .where("email", email)
      .where("password", password);

    if (userId.length > 0) {
      const token = Authenticate.getJWT(userId);
      return response.status(201).json({ auth: true, token });
    } else {
      return response
        .status(401)
        .json({ auth: false, message: "user or password is invalid." })
        .end();
    }
  }
}

export default UserController;
