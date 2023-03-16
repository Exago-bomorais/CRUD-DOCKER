import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async craete(data: UserDto) {
    const userExists = await this.prisma.user.findFirst({
      where: { email: data.email },
    });

    if (userExists) {
      throw new HttpException(
        'Usuario já cadastrado',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const user = await this.prisma.user.create({ data: data });

    return user;
  }
}
