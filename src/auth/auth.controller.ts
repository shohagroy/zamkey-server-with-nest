import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async create(@Body() createAuthDto: CreateUserDto) {
    const response = await this.authService.create(createAuthDto);
    return {
      message: 'User created successfully',
      data: response,
    };
  }

  @Post('/login')
  async login(@Body() createAuthDto: CreateUserDto) {
    const response = await this.authService.validateUser(createAuthDto);
    return {
      message: 'User Loign successfully',
      data: response,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/get-login-user')
  async getLoginUser(@Request() req) {
    const response = await this.authService.getLoginUser(req.user);
    return {
      message: 'User Get successfully',
      data: response,
    };
  }
}
