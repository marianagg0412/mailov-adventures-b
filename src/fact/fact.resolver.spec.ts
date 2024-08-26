import { Test, TestingModule } from '@nestjs/testing';
import { FactResolver } from './fact.resolver';
import { FactService } from './fact.service';

describe('FactResolver', () => {
  let resolver: FactResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FactResolver, FactService],
    }).compile();

    resolver = module.get<FactResolver>(FactResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
