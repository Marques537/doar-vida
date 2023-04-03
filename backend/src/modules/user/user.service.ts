import { inject, injectable } from 'tsyringe';
import { CustomError } from '../../shared/CustomError';
import Authenticate from '../auth/AuthController';
import { CreatedUserResponse, CreateUserDTO } from './types/dto/createUser.dto';
import { GetUserDTO, GetUserResponse } from './types/dto/getUser.dto';
import { LoginUserDTO, LoginUserResponse } from './types/dto/loginUser.dto';
import { UpdateUserDto, UpdateUserResponse } from './types/dto/updateUser.dto';
import { UserRepository } from './user.repository';

export interface UserService {
  create(user: CreateUserDTO): Promise<CreatedUserResponse | CustomError>;
  login(user: LoginUserDTO): Promise<LoginUserResponse>;
  getUser(user: GetUserDTO): Promise<GetUserResponse>;
}

@injectable()
export class UserServiceImpl implements UserService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository
  ) {}

  async create(
    user: CreateUserDTO
  ): Promise<CreatedUserResponse | CustomError> {
    const selectedUser = await this.userRepository.selectUserByEmail(
      user.email
    );
    if (selectedUser.length > 0) {
      throw new CustomError('email already used');
    }
    try {
      const insertedIds = await this.userRepository.createUser(user);
      return { userId: insertedIds.toString() };
    } catch (error: any) {
      throw new CustomError('Error to create user', error);
    }
  }

  async login(user: LoginUserDTO): Promise<LoginUserResponse> {
    const userId = await this.userRepository.selectUserIdByEmailAndPassword(
      user.email,
      user.password
    );
    if (userId) {
      const token = Authenticate.getJWT(userId);
      return { auth: true, token, id: userId.id };
    } else {
      return { auth: false, message: 'user or password is invalid.' };
    }
  }
  async getUser(getUser: GetUserDTO): Promise<GetUserResponse> {
    const user = await this.userRepository.selectUserById(getUser.id);

    if (user) {
      return { name: user.name, email: user.email, gender: user.gender };
    } else {
      return { message: 'user not found.' };
    }
  }
  async updateUser(params: UpdateUserDto): Promise<UpdateUserResponse> {
    const user = await this.userRepository.updateUserNameById(
      params.userId,
      params.name
    );
    if (user) {
      const updatedUser = await this.getUser({ id: params.userId });

      return {
        name: updatedUser.name,
        email: updatedUser.email,
        gender: updatedUser.gender,
      };
    } else {
      return { message: 'user not found.' };
    }
  }
}
