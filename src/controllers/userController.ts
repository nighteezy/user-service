import { Request, Response } from "express";
import {
  CreateUserDto,
  LoginDto,
  UserResponseDto,
  LoginResponseDto,
} from "../types/user";
import { UserService } from "../services/userService";
import { User } from "../entities/User";
import { AuthRequest } from "../middleware/auth";
import { plainToInstance } from "class-transformer";

const userService = new UserService();

export const register = async (
  req: Request<{}, {}, CreateUserDto>,
  res: Response
) => {
  try {
    const userData: CreateUserDto = req.body;
    const user: User = await userService.register(userData);

    res.status(201).json({
      message: "User created",
      user: plainToInstance(UserResponseDto, user),
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req: Request<{}, {}, LoginDto>, res: Response) => {
  try {
    const { email, password }: LoginDto = req.body;
    const { token, user } = await userService.login(email, password);

    const response: LoginResponseDto = {
      token,
      user: plainToInstance(UserResponseDto, user),
    };

    res.json(response);
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};

export const getUserById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.findById(id, req.userId!, req.userRole!);

    res.json(plainToInstance(UserResponseDto, user));
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await userService.findAll();

    res.json(plainToInstance(UserResponseDto, users));
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const blockUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.toggleBlock(id, req.userId!, req.userRole!);

    res.json({
      message: `User ${user.isActive ? "unblocked" : "blocked"}`,
      user: res.json(plainToInstance(UserResponseDto, user)),
    });
  } catch (err: any) {
    res.status(403).json({ message: err.message });
  }
};
