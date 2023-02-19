import { BaseRepository } from 'src/common/BaseRepository';
import { TodoListEntity } from '../Domain/todo-list.entity';

export interface ITodoListRepository extends BaseRepository<TodoListEntity> {}
