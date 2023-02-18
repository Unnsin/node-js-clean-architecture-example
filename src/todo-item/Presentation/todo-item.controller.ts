import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TodoItemService } from '../Domain/todo-item.service';
import { TodoItemEntity } from '../Domain/TodoEntity';
import { CreateTodoItemDTO, UpdateTotoItemDTO } from './dto';

@Controller('/todo-item')
@ApiTags('Todo Item v0.1')
export class TodoItemController {
  constructor(private readonly todoItemService: TodoItemService) {}

  @Post()
  @ApiBody({ type: CreateTodoItemDTO })
  createTodoItem(@Body() body: CreateTodoItemDTO): Promise<TodoItemEntity> {
    return this.todoItemService.createTodoItem(body);
  }

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'where', type: String, required: false })
  getList(
    @Query('page', ParseIntPipe) page?: number,
    @Query('limit', ParseIntPipe) limit?: number,
    @Query('where') where?: string,
  ): Promise<TodoItemEntity[]> {
    const parsedWhere = JSON.parse(where ? where : '{}');
    return this.todoItemService.getList(parsedWhere, page, limit);
  }

  @Get('/:id')
  @ApiParam({ name: 'id', type: String, required: true })
  getById(@Param('id') id: string): Promise<TodoItemEntity> {
    return this.todoItemService.getById(id);
  }

  @Get('/:id/complete')
  @ApiParam({ name: 'id', type: String, required: true })
  complete(@Param('id') id: string): Promise<TodoItemEntity> {
    return this.todoItemService.complete(id);
  }

  @Put('/')
  @ApiBody({ type: UpdateTotoItemDTO })
  updateTodoItem(
    @Body() updateBody: UpdateTotoItemDTO,
  ): Promise<TodoItemEntity> {
    return this.todoItemService.updateTodoItem(updateBody);
  }

  @Delete('/:id')
  @ApiParam({ name: 'id' })
  deleteItem(@Param('id') id: string): Promise<boolean> {
    return this.todoItemService.deleteById(id);
  }
}
