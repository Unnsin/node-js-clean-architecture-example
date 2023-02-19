import { Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { TodoItemEntity } from 'src/todo-item/Domain/TodoEntity';
import { ITodoItemRepo } from 'src/todo-item/Infrastructure/todo-item.repo.interface';
import { ITodoListRepository } from '../Infrastructure/todo-list.repo.interface';
import { CreateTodoListDTO, UpdateTodoListDto } from '../Presentation/dto';
import { TodoListEntity } from './todo-list.entity';

@Injectable()
export class TodoListService {
  constructor(
    @Inject('TodoListRepo') private readonly todoListRepo: ITodoListRepository,
    @Inject('TodoItemRepo') private readonly todoItemRepo: ITodoItemRepo,
  ) {}

  create(body: CreateTodoListDTO): Promise<TodoListEntity> {
    const entity = new TodoListEntity(body);
    return this.todoListRepo.Save(entity);
  }

  get(
    where: Partial<TodoListEntity>,
    page?: number,
    limit?: number,
  ): Promise<TodoListEntity[]> {
    return this.todoListRepo.Get({
      where,
      page: page || 1,
      limit: limit || 10,
    });
  }

  getById(id: string): Promise<TodoListEntity> {
    return this.todoListRepo.GetById(id);
  }

  async deleteById(id: string): Promise<boolean> {
    const entity = await this.todoListRepo.GetById(id);
    return this.todoListRepo.Delete(entity);
  }

  async update(body: UpdateTodoListDto): Promise<TodoListEntity> {
    const entity = await this.todoListRepo.GetById(body.id);
    entity.update(body);
    return this.todoListRepo.Update(entity);
  }

  async getTodoListWithItem(
    id: string,
  ): Promise<{ entity: TodoListEntity; items: TodoItemEntity[] }> {
    const entity = await this.todoListRepo.GetById(id);
    const items = await this.todoItemRepo.Get({
      where: { todoListId: entity.id },
      page: 1,
      limit: 10,
    });

    return {
      entity,
      items,
    };
  }
}
