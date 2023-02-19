import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoItemModule } from './todo-item/todo-item.module';
import { TodoListModule } from './todo-list/todo-list.module';

@Module({
  imports: [
    TodoItemModule,
    TodoListModule,
    MongooseModule.forRoot('mongodb://localhost/todo-clean-architecture'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
