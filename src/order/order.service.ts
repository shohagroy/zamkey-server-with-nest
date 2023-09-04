import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UserDoc } from 'src/user/schema/User.schema';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OrderService {
  private productService: ProductService;
  async create(createOrderDto: CreateOrderDto, user: UserDoc) {
    const { orderType, productID } = createOrderDto;

    console.log(orderType, productID);
    const orderProduct = await this.productService.findOne(productID);

    console.log(orderProduct);

    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
