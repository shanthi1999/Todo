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
import { ResponseService } from 'src/common/responseHandler/response.service';
import { Response } from 'express';
import { CreateTodoDto } from './dtos/createTodo.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@Controller('todos')
@ApiTags('todos')
export class TodoController {
  constructor(
    private todoService: TodoService,
    private readonly responseService: ResponseService,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Todo List retrieved successfully',
    isArray: true,
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
