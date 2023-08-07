import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../common/entities/todo.entity';
import { CreateTodoDto } from './dtos/createTodo.dto';
import { TodoListResponse } from './interface';

@Injectable({})
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async getTodoList(
    page: number,
    pageSize: number,
    sortField: string | null = null,
    sortOrder: 'ASC' | 'DESC' | null = null,
    searchQuery: string | null = null,
    filterStatus: boolean | false = null,
  ): Promise<TodoListResponse> {
    const query = this.todoRepository.createQueryBuilder('todo');

    if (filterStatus) {
      query.andWhere(`todo.completed = :completed`, {
        completed: filterStatus,
      });
    }

    // Apply search query if provided
    if (searchQuery) {
      query.andWhere(`todo.title ILIKE :searchQuery`, {
        searchQuery: `%${searchQuery}%`,
      });
    }

    if (sortField && sortOrder) {
      query.orderBy(`todo.${sortField}`, sortOrder);
    }

    const total = await query.getCount();

    // Apply pagination
    const todos = await query
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getMany();

    return {
      data: todos,
      totalRecords: total,
      currentPage: page,
      pageSize: pageSize,
    };
  }

  createTodo(todoData: CreateTodoDto): Promise<Todo> {
    const newTodo = this.todoRepository.create(todoData);
    return this.todoRepository.save(newTodo);
  }

  async updateTodo(
    id: number,
    todoData: Partial<CreateTodoDto>,
  ): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });

    if (!todo) {
      throw Error('Todo not found');
    }

    Object.assign(todo, todoData);

    return this.todoRepository.save(todo);
  }

  async deleteTodo(id: number): Promise<{ msg: string }> {
    const todo = await this.todoRepository.findOne({ where: { id } });

    if (!todo) {
      throw new Error('Todo not found');
    }

    await this.todoRepository.delete(id);

    return { msg: 'Todo deleted' };
  }
}
