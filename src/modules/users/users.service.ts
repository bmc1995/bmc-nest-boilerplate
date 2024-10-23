import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/repositories/user/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../database/repositories/user/dto/create-user.dto';
import { UpdateUserDto } from '../../database/repositories/user/dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    // return 'This action adds a new user';
    const usr = await this.userRepository.insert(createUserDto);
    return usr.identifiers;
  }

  async findAll() {
    return await this.userRepository.find({});
  }

  findOne(email: string) {
    return this.userRepository.findOneBy({ email });
    // return `This action returns a user with the email: ${email}`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
