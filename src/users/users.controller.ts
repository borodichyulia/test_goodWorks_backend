import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(@Res({ passthrough: true }) response: Response) {
    response.cookie('key', 'value');
    return this.usersService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':email')
  async getUser(
    @Res({ passthrough: true }) response: Response,
    @Param('email') email: string,
  ) {
    return this.usersService.getUserByEmail(email);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':email')
  async updateUser(
    @Res({ passthrough: true }) response: Response,
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(email, updateUserDto);
  }
}
