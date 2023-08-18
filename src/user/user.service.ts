import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDoc } from './schema/User.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDoc>) {}

  create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return createUserDto;
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(email: string): Promise<Partial<UserDoc>> {
    const user = await this.userModel
      .findOne({ email })
      .select(['firstName', 'role', 'email']);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
