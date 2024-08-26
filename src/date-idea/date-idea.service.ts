import { Injectable } from '@nestjs/common';
import { CreateDateIdeaInput } from './dto/create-date-idea.input';
import { UpdateDateIdeaInput } from './dto/update-date-idea.input';

@Injectable()
export class DateIdeaService {
  create(createDateIdeaInput: CreateDateIdeaInput) {
    return 'This action adds a new dateIdea';
  }

  findAll() {
    return `This action returns all dateIdea`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dateIdea`;
  }

  update(id: number, updateDateIdeaInput: UpdateDateIdeaInput) {
    return `This action updates a #${id} dateIdea`;
  }

  remove(id: number) {
    return `This action removes a #${id} dateIdea`;
  }
}
