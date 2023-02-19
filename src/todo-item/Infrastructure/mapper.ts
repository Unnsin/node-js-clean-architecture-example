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
      ...value,
      _id: new Types.ObjectId(value.id),
      todoListId: value.todoListId,
      createdAt: new Date(value.createdAt).toISOString(),
      updatedAt: new Date(value.updatedAt).toISOString(),
    };
  }

  toEntity(body: TodoItemDocument): TodoItemEntity {
    return new TodoItemEntity({
      id: body._id.toString(),
      title: body.title,
      isComplete: body.isComplete,
      todoListId: body.todoListId,
      createdAt: new Date(body.createdAt).getTime(),
      updatedAt: new Date(body.updatedAt).getTime(),
    });
  }
}
