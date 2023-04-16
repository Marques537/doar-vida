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
  updateUserNameById(userId: string, name: string): Promise<User>;
  updateUserPasswordById(userId: string, newPassword: string): Promise<User>;
  getUserByIdAndPassword(userId: string, password: string): Promise<UserId>;
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

  async updateUserNameById(userId: string, name: string): Promise<User> {
    return knex('users').where('id', userId).update({
      name,
    });
  }

  async getUserByIdAndPassword(
    userId: string,
    password: string
  ): Promise<UserId> {
    return knex
      .select('id')
      .from<Object>('users')
      .first()
      .where('id', userId)
      .andWhere('password', password);
  }

  async updateUserPasswordById(
    userId: string,
    newPassword: string
  ): Promise<User> {
    return knex('users').where('id', userId).update({
      password: newPassword,
    });
  }
}
