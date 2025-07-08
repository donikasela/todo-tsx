export interface Todo {
  id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTodo {
  description?: string;
  title: string;
  priority: "low" | "medium" | "high";
}

export interface UpdateTodo {
  id: string;
  title?: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  completed?: boolean;
}
