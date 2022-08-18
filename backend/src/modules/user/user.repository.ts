import knex from "../database/connection";
import { CreateUserDTO } from "./types/dto/createUser.dto";
import { User } from "./types/user.interface";

export interface UserRepository {
  createUser(user: User): Promise<CreateUserDTO>;
  selectUserByEmail(email: string): Promise<User[]>;
  selectUserByEmailAndPassword(
    email: string,
    password: string
  ): Promise<User[]>;
}
export class UserRepositoryImpl implements UserRepository {
  async createUser(user: User): Promise<CreateUserDTO> {
    return knex("users").insert(user);
  }
  async selectUserByEmail(email: string): Promise<User[]> {
    return knex.select("id").from<Object>("users").where("email", email);
  }
  async selectUserByEmailAndPassword(
    email: string,
    password: string
  ): Promise<User[]> {
    return knex
      .select("id")
      .from<Object>("users")
      .where("email", email)
      .andWhere("password", password);
  }
}
