import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiSecurity('JWT-Auth')
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiSecurity('JWT-Auth')
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiSecurity('JWT-Auth')
  @Delete('/:id')
  deleteById(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiSecurity('JWT-Auth')
  @Patch('/:id')
  updateById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}
