import * as bcrypt from "bcrypt";
import { AppDataSource } from "../config/database";
import { User } from "../entities/User";
import { CreateUserDto } from "../types/user";
import { generateToken } from "../utils/jwt";

const userRepository = AppDataSource.getRepository(User);

export class UserService {
  async register(userData: CreateUserDto): Promise<User> {
    const existingUser = await userRepository.findOneBy({
      email: userData.email,
    });
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const user = userRepository.create({
      ...userData,
      role: userData.role || "user",
    });
    return await userRepository.save(user);
  }

  async login(
    email: string,
    password: string
  ): Promise<{ token: string; user: User }> {
    const user = await userRepository.findOneBy({ email });
    if (!user || !user.isActive) {
      throw new Error("Invalid credentials or user is blocked");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken(user.id, user.role);
    return { token, user };
  }

  async findById(
    id: string,
    requesterId: string,
    requesterRole: string
  ): Promise<User> {
    const user = await userRepository.findOneBy({ id });
    if (!user) throw new Error("User not found");

    if (requesterRole !== "admin" && requesterId !== id) {
      throw new Error("Access denied");
    }

    return user;
  }

  async findAll(): Promise<User[]> {
    return await userRepository.find();
  }

  async toggleBlock(
    id: string,
    requesterId: string,
    requesterRole: string
  ): Promise<User> {
    const user = await userRepository.findOneBy({ id });
    if (!user) throw new Error("User not found");

    if (requesterRole !== "admin" && requesterId !== id) {
      throw new Error("Access denied");
    }

    user.isActive = !user.isActive;
    return await userRepository.save(user);
  }
}
