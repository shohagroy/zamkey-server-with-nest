import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Patch,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/carts')
@ApiTags('cart-list')
@UseGuards(AuthGuard('jwt'))
@ApiSecurity('JWT-Auth')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/add')
  create(@Body() createCartDto: CreateCartDto, @Request() req) {
    return this.cartService.create(req.user, createCartDto);
  }

  @Patch('/remove')
  removeOne(@Body() createCartDto: CreateCartDto, @Request() req) {
    return this.cartService.removeOne(req.user, createCartDto);
  }

  @Delete('/remove-from-cart')
  removeFromCart(@Body() createCartDto: CreateCartDto, @Request() req) {
    return this.cartService.removeFromCart(
      req.user._id,
      createCartDto.productId,
    );
  }

  @Get()
  findAll(@Request() req) {
    return this.cartService.findAll(req.user);
  }
}
