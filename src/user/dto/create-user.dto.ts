export class CreateUserDto {
  _id?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  role: string;
  cartList?: [string?];
}
