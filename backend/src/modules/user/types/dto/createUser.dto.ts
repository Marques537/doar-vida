export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  gender: string;
}

export interface CreatedUserResponse {
  userId: string;
}
