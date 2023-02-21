import { Request, Response } from 'express';
import { UserServiceImpl } from './user.service';
import { container } from 'tsyringe';
import { CustomError } from '../../shared/CustomError';

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
    const userService = container.resolve(UserServiceImpl);
    const { email, password } = request.body;

    if (!email || !password) {
      return response
        .status(400)
        .json({ message: 'user or password not provided.' });
    }

    const loginAtempt = await userService.login({ email, password });

    if (loginAtempt.auth) {
      return response.status(201).json({
        auth: loginAtempt.auth,
        token: loginAtempt.token,
        id: loginAtempt.id,
      });
    } else {
      return response
        .status(401)
        .json({ auth: loginAtempt.auth, message: loginAtempt.message })
        .end();
    }
  }
  async getUser(request: Request, response: Response) {
    const userService = container.resolve(UserServiceImpl);
    const { userId } = request.params;

    if (!userId) {
      return response.status(400).json({ message: 'userId not provided.' });
    }

    const user = await userService.getUser({ id: String(userId) });

    if (user.email) {
      return response.status(201).json(user);
    } else {
      return response.status(401).json({ message: user.message }).end();
    }
  }
}
export default UserController;
