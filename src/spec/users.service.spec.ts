import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../database/repositories/user/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../modules/users/users.service';

describe('UsersService', () => {
  let service: UsersService;
  const repositoryMockFactory = () => {
    return { msg: 'mockFunc' };
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
