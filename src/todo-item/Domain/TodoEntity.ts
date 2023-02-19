import { BaseEntity } from 'src/common/BaseEntity';

export class TodoItemEntity extends BaseEntity {
  title: string;
  isComplete: boolean;
  todoListId: string;

  complete() {
    this.title = `Completed: ${this.title}`;
    this.isComplete = true;
  }

  update(body: Partial<TodoItemEntity>) {
    Object.assign(this, body);
  }

  constructor(partial: Partial<TodoItemEntity>) {
    super(partial);
    Object.assign(this, partial);
  }
}
