import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Mapper } from 'src/common/Mapper';
import { TodoListEntity } from '../Domain/todo-list.entity';
import { TodoListDocument } from './todo-list.schema';

@Injectable()
export class TodoListMapper
  implements Mapper<TodoListDocument, TodoListEntity>
{
  toEntity(value: TodoListDocument): TodoListEntity {
    return new TodoListEntity({
      id: value._id.toString(),
      createdAt: new Date(value.createdAt).getTime(),
      updatedAt: new Date(value.updatedAt).getTime(),
      title: value.title,
      author: value.author,
    });
  }

  fromEntity(value: TodoListEntity): Partial<TodoListDocument> {
    return {
      _id: new Types.ObjectId(value.id),
      createdAt: new Date(value.createdAt).toISOString(),
      updatedAt: new Date(value.updatedAt).toISOString(),
      title: value.title,
      author: value.author,
    };
  }
}
