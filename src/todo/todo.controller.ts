import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Res,
  Body,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { ResponseService } from '../common/responseHandler/response.service';
import { Response } from 'express';
import { CreateTodoDto } from './dtos/createTodo.dto';
import {
  ApiTags,
  ApiResponse,
  ApiQuery,
  ApiOperation,
  ApiBadRequestResponse,
  ApiBody,
} from '@nestjs/swagger';
import { Todo } from 'src/common/entities/todo.entity';
import { TodoListResponse } from './interface/index';
import { TodoResponseDto, TodoDto } from './dtos/getTodo.dto'; // Adjust the path as needed
import { TodoErrorResponseDto } from './dtos/errorResponse.dto';

@Controller('todos')
@ApiTags('TODO APIS')
export class TodoController {
  constructor(
    private todoService: TodoService,
    private readonly responseService: ResponseService,
  ) {}

  @Get()
  @ApiOperation({ summary: "Get a list of all todo's with pagination" })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Current page number',
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    type: Number,
    description: "Todo's per page",
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search todo by title',
  })
  @ApiQuery({
    name: 'sortField',
    required: false,
    type: String,
    description:
      'Sort the todo list by field name for eg: created_at or updated_at',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    type: String,
    description: 'Sort the todo list by ASC or DESC',
  })
  @ApiQuery({
    name: 'filterStatus',
    required: false,
    type: Boolean,
    description: 'filter the todo list by completed status',
  })
  @ApiResponse({
    status: 200,
    description: 'List of todos retrieved successfully',
    type: TodoResponseDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "If the API get's failed",
    type: TodoErrorResponseDto,
  })
  async getTodoList(
    @Res() res: Response,
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
    @Query('search') search = null,
    @Query('sortField') sortField = null,
    @Query('sortOrder') sortOrder = null,
    @Query('filterStatus') filterStatus: boolean | null = null,
  ): Promise<void> {
    try {
      const todoList = await this.todoService.getTodoList(
        page,
        pageSize,
        sortField,
        sortOrder,
        search,
        filterStatus,
      );
      return this.responseService.sendResponse(
        res,
        200,
        todoList,
        'Todo List retrieved successfully',
      );
    } catch (error) {
      return this.responseService.sendResponse(
        res,
        400,
        null,
        'Failed to retrieve todo list: ' + error?.message,
      );
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiBody({ type: CreateTodoDto })
  @ApiResponse({
    status: 200,
    description: 'Todo inserted successfully',
    type: TodoDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "If the API get's failed",
    type: TodoErrorResponseDto,
  })
  async createTodo(
    @Body() todoData: CreateTodoDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const resultData = await this.todoService.createTodo(todoData);
      return this.responseService.sendResponse(
        res,
        200,
        { ...resultData },
        'Todo inserted successfully',
      );
    } catch (error) {
      return this.responseService.sendResponse(
        res,
        400,
        null,
        'Failed to insert todo: ' + error?.message,
      );
    }
  }

  @Put()
  @ApiOperation({ summary: 'Update todo' })
  @ApiQuery({
    name: 'id',
    required: true,
    type: Number,
    description: 'Todo is updated by using the ID',
  })
  @ApiBody({ type: CreateTodoDto })
  @ApiResponse({
    status: 200,
    description: 'Todo updated successfully',
    type: Todo,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "If the API get's failed",
    type: TodoErrorResponseDto,
  })
  async updateTodo(
    @Body() todoData: Partial<CreateTodoDto>,
    @Res() res: Response,
    @Query('id') id: number,
  ): Promise<void> {
    try {
      if (id) {
        const updatedData = await this.todoService.updateTodo(id, todoData);
        return this.responseService.sendResponse(
          res,
          200,
          { ...updatedData },
          'Todo updated successfully',
        );
      } else {
        return this.responseService.sendResponse(
          res,
          400,
          null,
          'Todo ID not found',
        );
      }
    } catch (error) {
      return this.responseService.sendResponse(
        res,
        400,
        null,
        'Failed to update todo: ' + error?.message,
      );
    }
  }

  @Delete()
  @ApiOperation({ summary: 'Delete todo' })
  @ApiQuery({
    name: 'id',
    required: true,
    type: Number,
    description: 'Todo is deleted by using the ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Todo deleted successfully',
    type: {} as any,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "If the API get's failed",
    type: TodoErrorResponseDto,
  })
  async deleteTodo(@Res() res: Response, @Query('id') id: number) {
    try {
      if (id) {
        await this.todoService.deleteTodo(id);
        return this.responseService.sendResponse(
          res,
          200,
          {},
          'Todo removed successfully',
        );
      } else {
        return this.responseService.sendResponse(
          res,
          400,
          null,
          'Todo ID not found',
        );
      }
    } catch (error) {
      console.log(error);
      return this.responseService.sendResponse(
        res,
        400,
        null,
        'Failed to remove todo: ' + error?.message,
      );
    }
  }
}
