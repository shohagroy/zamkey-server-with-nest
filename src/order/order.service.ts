import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserDoc } from 'src/user/schema/User.schema';
import { ProductService } from 'src/product/product.service';
import { Order, OrderDoc } from './schema/order.schema';
import { OrderType } from './order.constants';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPaginationOptions } from 'interface/pagination.interface';
import { paginationHelpers } from 'helpers/paginationHelper';
import bkash from 'configs/BkashConfig';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDoc>,
    private readonly productService: ProductService,
  ) {}

  async create(createOrderDto: CreateOrderDto, user: UserDoc) {
    const { orderType, productID, quantity } = createOrderDto;

    const orderProduct = await this.productService.findOne(productID);

    const productPrice = orderProduct.data.price;
    const discountPercentage = orderProduct.data.discount;

    const totalPrice = productPrice * quantity * (1 - discountPercentage / 100);

    const orderInfo = {
      productName: orderProduct.data.title,
      productID,
      price: orderProduct.data.price,
      discount: orderProduct.data.discount,
      quantity: quantity,
      paymentMethod: orderType,
      totalPrice,
      userId: user._id,
    };

    if (orderType === OrderType.CASH_ON_DELIVERY) {
      const result = await this.orderModel.create(orderInfo);

      return {
        data: result,
        message: 'Order Created Successfully!',
      };
    }

    if (orderType === OrderType.BKASH_PAYMENT) {
      console.log('bkash payment', orderInfo);

      const paymentRequest: any = {
        amount: 1000,
        orderID: 'ORD1020069',
        intent: 'sale',
      };

      try {
        const result = await bkash.createPayment(paymentRequest);

        console.log(result);
      } catch (error) {
        console.log(error);
      }

      // return {
      //   data: result,
      //   message: 'Order Created Successfully!',
      // };
    }

    return 'This action adds a new order';
  }

  async findAll(paginationOptions: IPaginationOptions, user: UserDoc) {
    const { page, limit, skip } =
      paginationHelpers.calculatePagination(paginationOptions);

    const result = await this.orderModel
      .find({ userId: user?._id })
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.orderModel.countDocuments();

    return {
      message: 'Orderlist Recieved Successfully',
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  }

  async findOne(id: string) {
    const result = await this.orderModel.findById(id).populate('productID');

    return {
      data: result,
      message: 'Order Recieved Successfully!',
    };
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
