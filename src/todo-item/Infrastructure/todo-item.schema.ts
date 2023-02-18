import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TodoItemDocument = HydratedDocument<TodoItem> & {
  createdAt: string;
  updatedAt: string;
};

@Schema({ timestamps: true })
export class TodoItem {
  @Prop()
  title: string;

  @Prop({ default: false })
  isComplete: boolean;
}

export const TodoItemSchema = SchemaFactory.createForClass(TodoItem);
