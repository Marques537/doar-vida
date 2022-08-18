import { inject, injectable } from "tsyringe";
import { CustomError } from "../../shared/CustomError";
import Authenticate from "../auth/AuthController";
import { CreatedUserResponse, CreateUserDTO } from "./types/dto/createUser.dto";
import { LoginUserDTO, LoginUserResponse } from "./types/dto/loginUser.dto";
import { UserRepository } from "./user.repository";

export interface UserService {
  create(user: CreateUserDTO): Promise<CreatedUserResponse | CustomError>;

  login(user: LoginUserDTO): Promise<LoginUserResponse>;
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

  async login(user: LoginUserDTO): Promise<LoginUserResponse> {
    const userId = await this.userRepository.selectUserByEmailAndPassword(
      user.email,
      user.password
    );

    if (userId.length > 0) {
      const token = Authenticate.getJWT(userId);
      return { auth: true, token };
    } else {
      return { auth: false, message: "user or password is invalid." };
    }
  }
}
