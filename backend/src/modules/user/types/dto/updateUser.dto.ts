export interface UpdateUserDto {
  userId: string;
  name: string;
}

export interface UpdateUserResponse {
  name?: string;
  email?: string;
  message?: string;
  gender?: string;
}
