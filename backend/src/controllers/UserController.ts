import { Request, Response } from 'express';
import knex from '../database/connection';
import Authenticate from './AuthController';
class UserController {
  async create(request: Request, response: Response){
    const {name, email, password} = request.body;
    const user = {name, email, password};

  try{
    const insertedIds = await knex('users').insert(user);
    const userId = insertedIds[0];
    return response.json({
     userId,
      ...user
    });
  }
  catch (error){
    return response.status(400).json({error});
  }

  };
  async login(request: Request, response: Response){
    const { email, password } = request.body

    if (email === undefined || password === undefined){
      return response.status(400).json({message: 'user or password not provided.'})
    }

    const userId = await knex.select('id').
      from<Object>('users')
      .where('email', email)
      .where('password', password)

    if (userId.length > 0){
      const token =  Authenticate.getJWT(userId);
      return response.status(200).json({auth: true, token});
    } else {
      return response.status(401).json({message: 'user or password is invalid.'}).end();
    }  

  }
};

export default UserController;