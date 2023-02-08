import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ email });
    return user;
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { userName, userSurname, age, email, password, list } = createUserDto;

    return this.usersRepository.create({
      userName,
      userSurname,
      age,
      email,
      password,
      list,
    });
  }

  async updateUser(email: string, userUpdates: UpdateUserDto): Promise<User> {
    return this.usersRepository.findOneAndUpdate({ email }, userUpdates);
  }
}
