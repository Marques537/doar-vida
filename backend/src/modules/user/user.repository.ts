import knex from '../database/connection';
import { CreateUserDTO } from './types/dto/createUser.dto';
import { User, UserId } from './types/user.interface';

export interface UserRepository {
  createUser(user: User): Promise<CreateUserDTO>;
  selectUserByEmail(email: string): Promise<User[]>;
  selectUserIdByEmailAndPassword(
    email: string,
    password: string
  ): Promise<UserId>;
  selectUserById(userId: string): Promise<User>;
}
export class UserRepositoryImpl implements UserRepository {
  async createUser(user: User): Promise<CreateUserDTO> {
    return knex('users').insert(user);
  }
  async selectUserByEmail(email: string): Promise<User[]> {
    return knex.select('id').from<Object>('users').where('email', email);
  }
  async selectUserIdByEmailAndPassword(
    email: string,
    password: string
  ): Promise<UserId> {
    return knex
      .select('id')
      .from<Object>('users')
      .first()
      .where('email', email)
      .andWhere('password', password);
  }
  async selectUserById(userId: string): Promise<User> {
    return knex.select('').from<Object>('users').first().where('id', userId);
  }
}
