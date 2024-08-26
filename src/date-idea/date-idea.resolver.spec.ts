import { Test, TestingModule } from '@nestjs/testing';
import { DateIdeaResolver } from './date-idea.resolver';
import { DateIdeaService } from './date-idea.service';

describe('DateIdeaResolver', () => {
  let resolver: DateIdeaResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DateIdeaResolver, DateIdeaService],
    }).compile();

    resolver = module.get<DateIdeaResolver>(DateIdeaResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
