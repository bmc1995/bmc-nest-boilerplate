import { Test, TestingModule } from '@nestjs/testing';
import { DocumentController } from '../modules/document/document.controller';
import { DocumentService } from '../modules/document/document.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DocumentEntity } from '../database/repositories/document/document.entity';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('DocumentController', () => {
  let controller: DocumentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentController],
      providers: [DocumentService],
    })
      .useMocker((token) => {
        const results = ['test1', 'test2'];
        if (token === DocumentService) {
          return { findAll: jest.fn().mockResolvedValue(results) };
        }
        if (token === getRepositoryToken(DocumentEntity)) {
          return { findAll: jest.fn().mockResolvedValue(results) };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = module.get<DocumentController>(DocumentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
