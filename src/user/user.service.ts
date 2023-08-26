import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDoc } from './schema/User.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDoc>) {}

  async create(createUserDto: CreateUserDto) {
    const result = await this.userModel.create(createUserDto);
    return result;
  }

  async findAll() {
    const result = await this.userModel.find();

    return {
      data: result,
      message: 'Users Recieved Successfully!',
    };
  }

  async findById(id: string) {
    const result = await this.userModel.findById(id);

    return {
      data: result,
      message: 'User Recieved Successfully!',
    };
  }

  async findAuthUser(email: string): Promise<Partial<UserDoc>> {
    const user = await this.userModel
      .findOne({ email })
      .select(['firstName', 'role', 'email', 'password']);

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const result = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });

    return {
      data: result,
      message: 'User Update Successfully!',
    };
  }

  async remove(id: string) {
    const result = await this.userModel.findByIdAndDelete(id);

    return {
      data: result,
      message: 'User delete Successfully!',
    };
  }

  async addToCart(id: string, cartId: mongoose.Types.ObjectId) {
    const result = await this.userModel.findByIdAndUpdate(
      { _id: id },
      {
        $push: { cartList: cartId },
      },
    );

    return {
      data: result,
      message: 'User Update Successfully!',
    };
  }

  async removeToCart(id: string, productId: mongoose.Types.ObjectId) {
    const result = await this.userModel.findByIdAndUpdate(
      { _id: id },
      {
        $pull: { cartList: productId },
      },
      { new: true },
    );

    return {
      data: result,
      message: 'User Update Successfully!',
    };
  }
}
