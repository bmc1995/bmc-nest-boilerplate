import { Test, TestingModule } from '@nestjs/testing';
import { DocumentService } from '../modules/document/document.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DocumentEntity } from '../database/repositories/document/document.entity';

describe('DocumentService', () => {
  let service: DocumentService;

  const repositoryMockFactory = () => {
    return { msg: 'mockFunc' };
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentService,
        {
          provide: getRepositoryToken(DocumentEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<DocumentService>(DocumentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
