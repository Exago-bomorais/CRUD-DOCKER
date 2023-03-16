import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/create-user.dto';
import { UserUpdateDto } from './dto/update-user.dto';

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

  async findUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        admin: true,
        posts: {
          select: {
            id: true,
            published: true,
            title: true,
            content: true,
            authorId: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const userExists = await this.prisma.user.findFirst({
      where: { id: +id },
    });

    if (!userExists) {
      throw new HttpException(
        `Usuario com o ID ${id} não localizado`,
        HttpStatus.NOT_FOUND,
      );
    }

    return userExists;
  }

  async update(id: string, userUpdate: UserUpdateDto) {
    const userExists = await this.prisma.user.findFirst({
      where: { id: Number(id) },
    });

    if (!userExists) {
      throw new HttpException(
        `Usuario com o ID ${id} não localizado`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.prisma.user.update({
      where: {
        id: Number(id),
      },
      data: userUpdate,
    });

    throw new HttpException(
      `Usuario ID: ${id}, atualizado com sucesso`,
      HttpStatus.OK,
    );
  }

  async delete(id: string) {
    const userExists = await this.prisma.user.findFirst({
      where: { id: Number(id) },
    });

    if (!userExists) {
      throw new HttpException(
        `Usuario com o ID ${id} não localizado`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.prisma.user.delete({ where: { id: Number(id) } });

    throw new HttpException(`Usuario ID: ${id}, deletado`, HttpStatus.OK);
  }
}
