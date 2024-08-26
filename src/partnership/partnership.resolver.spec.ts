import { Test, TestingModule } from '@nestjs/testing';
import { PartnershipResolver } from './partnership.resolver';
import { PartnershipService } from './partnership.service';

describe('PartnershipResolver', () => {
  let resolver: PartnershipResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartnershipResolver, PartnershipService],
    }).compile();

    resolver = module.get<PartnershipResolver>(PartnershipResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
