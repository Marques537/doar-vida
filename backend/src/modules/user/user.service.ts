import { autoInjectable, inject, injectable } from "tsyringe";
import { CustomError } from "../../shared/CustomError";
import { CreatedUserResponse, CreateUserDTO } from "./types/dto/createUser.dto";
import { UserRepository, UserRepositoryImpl } from "./user.repository";

export interface UserService {
  create(user: CreateUserDTO): Promise<CreatedUserResponse | CustomError>;
}

@injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @inject("UserRepository")
    private userRepository: UserRepository
  ) {}

  async create(
    user: CreateUserDTO
  ): Promise<CreatedUserResponse | CustomError> {
    const selectedUser = await this.userRepository.selectUserByEmail(
      user.email
    );
    if (selectedUser.length > 0) {
      throw new CustomError("email already used");
    }
    try {
      const insertedIds = await this.userRepository.createUser(user);
      return { userId: insertedIds.toString() };
    } catch (error: any) {
      throw new CustomError("Error to create user", error);
    }
  }
}
