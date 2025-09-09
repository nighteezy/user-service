import { UserRole } from "./userRole";

export interface CreateUserDto {
  fullName: string;
  birthDate: Date;
  email: string;
  password: string;
  role?: UserRole;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface UpdateUserDto {
  fullName?: string;
  birthDate?: Date;
}

export class UserResponseDto {
  id!: string;
  fullName!: string;
  email!: string;
  role!: "admin" | "user";
  isActive!: boolean;
  birthDate!: Date;
}

export interface LoginResponseDto {
  token: string;
  user: UserResponseDto;
}
