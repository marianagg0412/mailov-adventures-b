import { Injectable } from '@nestjs/common';
import { CreatePartnershipInput } from './dto/create-partnership.input';
import { UpdatePartnershipInput } from './dto/update-partnership.input';

@Injectable()
export class PartnershipService {
  create(createPartnershipInput: CreatePartnershipInput) {
    return 'This action adds a new partnership';
  }

  findAll() {
    return `This action returns all partnership`;
  }

  findOne(id: number) {
    return `This action returns a #${id} partnership`;
  }

  update(id: number, updatePartnershipInput: UpdatePartnershipInput) {
    return `This action updates a #${id} partnership`;
  }

  remove(id: number) {
    return `This action removes a #${id} partnership`;
  }
}
