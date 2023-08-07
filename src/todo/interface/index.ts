import { Todo } from '../../common/entities/todo.entity';

export interface TodoListResponse {
  data: Todo[];
  totalRecords: number;
  currentPage: number;
  pageSize: number;
}
