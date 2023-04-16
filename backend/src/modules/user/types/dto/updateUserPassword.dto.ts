export interface UpdateUserPasswordDto {
  userId: string;
  oldPassword: string;
  newPassword: string;
}

export interface UpdateUserPasswordResponse {
  message?: string;
}
