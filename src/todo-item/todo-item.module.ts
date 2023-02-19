import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoItemService } from './Domain/todo-item.service';
import { TodoItemMapper } from './Infrastructure/mapper';
import { TodoItemRepo } from './Infrastructure/todo-item.repo';
import { TodoItem, TodoItemSchema } from './Infrastructure/todo-item.schema';
import { TodoItemController } from './Presentation/todo-item.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TodoItem.name, schema: TodoItemSchema },
    ]),
  ],
  providers: [
    { provide: 'TodoItemRepo', useClass: TodoItemRepo },
    TodoItemMapper,
    TodoItemService,
  ],
  controllers: [TodoItemController],
  exports: [{ provide: 'TodoItemRepo', useClass: TodoItemRepo }],
})
export class TodoItemModule {}
