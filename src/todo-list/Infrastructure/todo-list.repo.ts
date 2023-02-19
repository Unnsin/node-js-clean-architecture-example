import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetParameter } from 'src/common/BaseRepository';
import { TodoListEntity } from '../Domain/todo-list.entity';
import { TodoListMapper } from './mapper';
import { ITodoListRepository } from './todo-list.repo.interface';
import { TodoListDocument } from './todo-list.schema';

@Injectable()
export class TodoListRepo implements ITodoListRepository {
  constructor(
    @InjectModel('TodoList') private readonly model: Model<TodoListDocument>,
    private readonly mapper: TodoListMapper,
  ) {}

  async Get(param?: GetParameter<TodoListEntity>): Promise<TodoListEntity[]> {
    const records = await this.model
      .find(param.where)
      .skip((param.page - 1) * param.limit)
      .limit(param.limit)
      .exec();
    return records.map(this.mapper.toEntity);
  }

  async GetById(id: string): Promise<TodoListEntity> {
    const record = await this.model.findById(id);
    return this.mapper.toEntity(record);
  }

  async Save(body: TodoListEntity): Promise<TodoListEntity> {
    const createdRecord = await this.model.create(body);
    return this.mapper.toEntity(createdRecord);
  }

  async Delete(entity: TodoListEntity): Promise<boolean> {
    await this.model.findByIdAndDelete(entity.id);
    return true;
  }

  async Update(entity: TodoListEntity): Promise<TodoListEntity> {
    const record = this.mapper.fromEntity(entity);
    const updatedRecord = await this.model.findByIdAndUpdate(
      record._id,
      record,
      { new: true },
    );
    return this.mapper.toEntity(updatedRecord);
  }
}
