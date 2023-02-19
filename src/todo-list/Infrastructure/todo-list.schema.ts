import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TodoListDocument = HydratedDocument<TodoList> & {
  createdAt: string;
  updatedAt: string;
};

@Schema({ timestamps: true })
export class TodoList {
  @Prop()
  title: string;

  @Prop()
  author: string;
}

export const TodoListSchema = SchemaFactory.createForClass(TodoList);
