import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoItemModule } from 'src/todo-item/todo-item.module';
import { TodoListService } from './Domain/todo-list.service';
import { TodoListMapper } from './Infrastructure/mapper';
import { TodoListRepo } from './Infrastructure/todo-list.repo';
import { TodoList, TodoListSchema } from './Infrastructure/todo-list.schema';
import { TodoListController } from './Presentation/todo-list.controller';

@Module({
  imports: [
    TodoItemModule,
    MongooseModule.forFeature([
      { name: TodoList.name, schema: TodoListSchema },
    ]),
  ],
  providers: [
    { provide: 'TodoListRepo', useClass: TodoListRepo },
    TodoListService,
    TodoListMapper,
  ],
  controllers: [TodoListController],
  exports: [],
})
export class TodoListModule {}
