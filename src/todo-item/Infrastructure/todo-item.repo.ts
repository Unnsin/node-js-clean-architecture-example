import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetParameter } from 'src/common/BaseRepository';
import { TodoItemEntity } from '../Domain/TodoEntity';
import { TodoItemMapper } from './mapper';
import { ITodoItemRepo } from './todo-item.repo.interface';
import { TodoItem, TodoItemDocument } from './todo-item.schema';

@Injectable()
export class TodoItemRepo implements ITodoItemRepo {
  constructor(
    @InjectModel(TodoItem.name) private readonly model: Model<TodoItemDocument>,
    private readonly mapper: TodoItemMapper,
  ) {}

  async Save(body: TodoItemEntity): Promise<TodoItemEntity> {
    const record = await this.model.create(body);
    return this.mapper.toEntity(record);
  }

  async Delete(entity: TodoItemEntity): Promise<boolean> {
    await this.model.findByIdAndDelete(entity.id);
    return true;
  }

  async Get(param: GetParameter<TodoItemEntity>): Promise<TodoItemEntity[]> {
    return (
      await this.model
        .find(param.where)
        .skip((param.page - 1) * param.limit)
        .limit(param.limit)
        .exec()
    ).map(this.mapper.toEntity);
  }

  async GetById(id: string): Promise<TodoItemEntity> {
    const record = await this.model.findById(id).exec();
    return this.mapper.toEntity(record);
  }

  async Update(entity: TodoItemEntity): Promise<TodoItemEntity> {
    const updatedBody = this.mapper.fromEntity(entity);
    const updatedRecord = await this.model
      .findByIdAndUpdate(updatedBody._id, updatedBody, { new: true })
      .exec();
    return this.mapper.toEntity(updatedRecord);
  }
}
