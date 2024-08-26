import { Test, TestingModule } from '@nestjs/testing';
import { DateIdeaService } from './date-idea.service';

describe('DateIdeaService', () => {
  let service: DateIdeaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DateIdeaService],
    }).compile();

    service = module.get<DateIdeaService>(DateIdeaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
