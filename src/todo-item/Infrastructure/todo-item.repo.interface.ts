import { BaseRepository } from 'src/common/BaseRepository';
import { TodoItemEntity } from '../Domain/TodoEntity';

export interface ITodoItemRepo extends BaseRepository<TodoItemEntity> {}
