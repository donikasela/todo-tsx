import { Todo, CreateTodo, UpdateTodo } from "../types/index";

export const createTodo = (input: CreateTodo): Todo => {
  const now = new Date();
  return {
    id: crypto.randomUUID(),
    title: input.title,
    description: input.description,
    priority: input.priority,
    completed: false,
    createdAt: now,
    updatedAt: now,
  };
};

export const updateTodo = (
  todo: Todo,
  updates: Omit<UpdateTodo, "id">
): Todo => {
  return {
    ...todo,
    ...updates,
    updatedAt: new Date(),
  };
};

export const sortTodoByPriority = (todo: Todo[]): Todo[] => {
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  return [...todo].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
};
