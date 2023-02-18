import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Mapper } from 'src/common/Mapper';
import { TodoItemEntity } from '../Domain/TodoEntity';
import { TodoItemDocument } from './todo-item.schema';

@Injectable()
export class TodoItemMapper
  implements Mapper<TodoItemDocument, TodoItemEntity>
{
  fromEntity(value: TodoItemEntity): Partial<TodoItemDocument> {
    return {
      _id: new Types.ObjectId(value.id),
      ...value,
      createdAt: new Date(value.createdAt).toISOString(),
      updatedAt: new Date(value.updatedAt).toISOString(),
    };
  }

  toEntity(body: TodoItemDocument): TodoItemEntity {
    return new TodoItemEntity({
      id: body._id.toString(),
      title: body.title,
      isComplete: body.isComplete,
      createdAt: new Date(body.createdAt).getTime(),
      updatedAt: new Date(body.updatedAt).getTime(),
    });
  }
}
