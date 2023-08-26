import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDoc } from './schema/User.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDoc>) {}

  async create(createUserDto: CreateUserDto) {
    const result = await this.userModel.create(createUserDto);
    return result;
  }

  async findById(id: string) {
    return await this.userModel.findById(id);
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findAuthUser(email: string): Promise<Partial<UserDoc>> {
    const user = await this.userModel
      .findOne({ email })
      .select(['firstName', 'role', 'email', 'password']);

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
