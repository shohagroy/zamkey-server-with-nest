import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDoc } from 'src/user/schema/User.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, confirmPassword, email: provaidEmail } = createUserDto;

    if (password !== confirmPassword) {
      throw new UnauthorizedException('Password does not match!');
    }

    const isExistingUser = await this.userService.findAuthUser(provaidEmail);

    if (isExistingUser) {
      throw new UnauthorizedException('User already exists!');
    }

    const bcryptPass = await bcrypt.hash(password, 10);
    const newUser = { email: provaidEmail, password: bcryptPass, role: 'user' };

    const user = await this.userService.create(newUser);

    const { _id, email, role } = user;
    const token = this.jwtService.sign({ _id, email, role });

    return { token, user: { _id, email, role } };
  }

  async validateUser(loginAuthDto: CreateUserDto) {
    const { email: loginEmail, password: loginPass } = loginAuthDto;

    const isExistingUser = await this.userService.findAuthUser(loginEmail);

    if (!isExistingUser) {
      throw new UnauthorizedException('User does not exist!');
    }

    const { _id, email, role, password } = isExistingUser;

    if (bcrypt.compareSync(loginPass, password)) {
      const token = this.jwtService.sign({ _id, email, role });
      return { token, user: { _id, email, role } };
    } else {
      throw new UnauthorizedException('Password does not match!');
    }
  }

  async getLoginUser(payload: Partial<UserDoc>) {
    const isExistingUser = await this.userService.findById(payload._id);

    return isExistingUser;
  }
}
