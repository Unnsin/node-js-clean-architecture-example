import { Inject, Injectable } from '@nestjs/common';
import { ITodoItemRepo } from '../Infrastructure/todo-item.repo.interface';
import { CreateTodoItemDTO, UpdateTotoItemDTO } from '../Presentation/dto';
import { TodoItemEntity } from './TodoEntity';

@Injectable()
export class TodoItemService {
  constructor(
    @Inject('TodoItemRepo') private readonly todoItemRepo: ITodoItemRepo,
  ) {}

  async createTodoItem(create: CreateTodoItemDTO): Promise<TodoItemEntity> {
    const entity: TodoItemEntity = new TodoItemEntity(create);
    let savedEntity = await this.todoItemRepo.Save(entity);
    return savedEntity;
  }

  async complete(id: string): Promise<TodoItemEntity> {
    const entity = await this.todoItemRepo.GetById(id);
    entity.complete();
    return this.todoItemRepo.Update(entity);
  }

  async getById(id: string): Promise<TodoItemEntity> {
    return this.todoItemRepo.GetById(id);
  }

  async getList(
    where: Partial<TodoItemEntity>,
    page: number = 1,
    limit: number = 10,
  ) {
    return await this.todoItemRepo.Get({
      where,
      page,
      limit,
    });
  }

  async updateTodoItem(body: UpdateTotoItemDTO): Promise<TodoItemEntity> {
    const entity = await this.todoItemRepo.GetById(body.id);
    entity.update(body);
    return this.todoItemRepo.Update(entity);
  }

  async deleteById(id: string): Promise<boolean> {
    const entity = await this.todoItemRepo.GetById(id);
    await this.todoItemRepo.Delete(entity);
    return true;
  }
}
