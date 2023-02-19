import { BaseEntity } from 'src/common/BaseEntity';

export class TodoListEntity extends BaseEntity {
  title: string;
  author: string;

  update(body: Partial<TodoListEntity>) {
    Object.assign(this, body);
  }

  constructor(partial: Partial<TodoListEntity>) {
    super(partial);
    Object.assign(this, partial);
  }
}
