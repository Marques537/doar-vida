import { Request, Response } from 'express';
import knex from '../database/connection';
import PointsController from './PointsController';

class User {
  name: string | undefined; ; 
  email:string | undefined; 
  password: string | undefined; ; 
};
class UserController {
  async create(request: Request, response: Response){
   const user: User = new User();
   user.name = 'Matheus'; 
   user.email =  'email';
   user.password= 'senha';

   const insertedIds = await knex('users').insert(user);
   const userId = insertedIds[0];
   return response.json({
    userId,
     ...user
   });
  };
};

export default UserController;