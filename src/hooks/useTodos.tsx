import { useState } from "react";
import { Todo, CreateTodo, UpdateTodo } from "@/types/index";
import { updateTodo, sortTodoByPriority } from "@/utils/todoUtils";

export default function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (input: CreateTodo) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: input.title,
      description: input.description,
      priority: input.priority,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id != id));
  };

  const editTodo = (updates: UpdateTodo) => {
    const { id, ...updatesWithoutId } = updates;
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? updateTodo(todo, updatesWithoutId) : todo
      )
    );
  };

  const toggleComplete = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return {
    todos: sortTodoByPriority(todos), // Sort once per render, "derived state" (computed when needed)
    addTodo,
    deleteTodo,
    editTodo,
    toggleComplete,
  };
}
