import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDoc } from './schema/cart.schema';
import { ProductService } from 'src/product/product.service';
import { UserDoc } from 'src/user/schema/User.schema';
import { UserService } from 'src/user/user.service';
import mongoose from 'mongoose';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDoc>,
    private productService: ProductService,
    private userService: UserService,
  ) {}

  async create(user: Partial<UserDoc>, createCartDto: CreateCartDto) {
    const cartProductExist = await this.cartModel.findOne({
      productId: createCartDto.productId,
    });

    if (cartProductExist) {
      const updateCartProduct = await this.cartModel.findOneAndUpdate(
        { productId: createCartDto.productId },
        { $inc: { quantity: 1 } },
        { new: true },
      );

      return {
        data: updateCartProduct,
        message: 'Cartlist Add Successfully!',
      };
    }

    const product = await this.productService.findOne(createCartDto.productId);

    if (!product?.data) {
      throw new NotFoundException('Product does not exist!');
    }

    try {
      const cartProduct: CreateCartDto = {
        productName: product.data.title,
        productId: product.data._id,
        price: product.data.price,
        discount: product.data.discount,
        quantity: 1,
        userId: user._id!,
      };

      const cartResponse = await this.cartModel.create(cartProduct);

      if (cartResponse._id) {
        await this.userService.addToCart(user._id, createCartDto.productId);

        return {
          data: cartResponse,
          message: 'Cartlist Added Successfully!',
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async removeOne(user: Partial<UserDoc>, createCartDto: CreateCartDto) {
    const cartProductExist = await this.cartModel.findOne({
      productId: createCartDto.productId,
    });

    if (!cartProductExist) {
      throw new NotFoundException('Cartlist does not exist!');
    }

    if (cartProductExist!.quantity > 1) {
      const updateCartProduct = await this.cartModel.findOneAndUpdate(
        { productId: createCartDto.productId },
        { $inc: { quantity: -1 } },
        { new: true },
      );

      return {
        data: updateCartProduct,
        message: 'Cartlist remove Successfully!',
      };
    }

    try {
      const cartResponse = await this.cartModel.deleteOne({
        productId: createCartDto.productId,
      });

      if (cartResponse.acknowledged) {
        await this.userService.removeToCart(user._id, createCartDto.productId);

        return {
          data: true,
          message: 'Cartlist Remove Successfully!',
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async removeFromCart(userId: string, productId: mongoose.Types.ObjectId) {
    const cart = await this.cartModel.deleteOne({ productId: productId });

    if (cart.acknowledged) {
      await this.userService.removeToCart(userId, productId);

      return {
        data: true,
        message: 'Cartlist Remove Successfully!',
      };
    }
  }

  async findAll(user: Partial<UserDoc>) {
    const result = await this.cartModel.find({ userId: user._id });
    return {
      message: 'Cartlist Recieved Successfully!',
      data: result,
    };
  }
}
