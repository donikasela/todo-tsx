export type Priority = "low" | "medium" | "high";
export interface Todo {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTodo {
  description?: string;
  title: string;
  priority: Priority;
}

export interface UpdateTodo {
  id: string;
  title?: string;
  description?: string;
  priority?: Priority;
  completed?: boolean;
}
