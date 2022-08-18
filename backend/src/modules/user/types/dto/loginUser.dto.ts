export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  auth: boolean;
  message?: string;
  token?: string;
}
