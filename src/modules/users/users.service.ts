import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

//TODO define user model & persistence layer
@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'example@email.com',
      password: 'password',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
