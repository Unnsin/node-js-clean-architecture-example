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
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TodoItemEntity } from 'src/todo-item/Domain/TodoEntity';
import { TodoListEntity } from '../Domain/todo-list.entity';
import { TodoListService } from '../Domain/todo-list.service';
import { CreateTodoListDTO, UpdateTodoListDto } from './dto';

@ApiTags('TodoList v0.1')
@Controller('todo-list')
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) {}

  @Post('/')
  createTodoList(@Body() body: CreateTodoListDTO): Promise<TodoListEntity> {
    return this.todoListService.create(body);
  }

  @Get('/')
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'where', type: String, required: false })
  getList(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('where') where: string,
  ): Promise<TodoListEntity[]> {
    const options = JSON.parse(where || '{}');
    return this.todoListService.get(options, page, limit);
  }

  @Get('/:id/with-item')
  getTodoListWithTodoItem(
    @Param('id') id: string,
  ): Promise<{ entity: TodoListEntity; items: TodoItemEntity[] }> {
    return this.todoListService.getTodoListWithItem(id);
  }

  @Get('/:id')
  @ApiParam({ name: 'id', type: String })
  getById(@Param('id') id: string): Promise<TodoListEntity> {
    return this.todoListService.getById(id);
  }

  @Put('/')
  update(@Body() body: UpdateTodoListDto): Promise<TodoListEntity> {
    return this.todoListService.update(body);
  }

  @Delete('/:id')
  @ApiParam({ name: 'id', type: String })
  deleteById(@Param('id') id: string) {
    return this.todoListService.deleteById(id);
  }
}
