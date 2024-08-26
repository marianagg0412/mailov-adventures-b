import { Injectable } from '@nestjs/common';
import { CreateFactInput } from './dto/create-fact.input';
import { UpdateFactInput } from './dto/update-fact.input';

@Injectable()
export class FactService {
  create(createFactInput: CreateFactInput) {
    return 'This action adds a new fact';
  }

  findAll() {
    return `This action returns all fact`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fact`;
  }

  update(id: number, updateFactInput: UpdateFactInput) {
    return `This action updates a #${id} fact`;
  }

  remove(id: number) {
    return `This action removes a #${id} fact`;
  }
}
