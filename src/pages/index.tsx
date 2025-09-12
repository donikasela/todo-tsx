import { Geist, Geist_Mono } from "next/font/google";
import { TodoForm } from "@/components/TodoForm";
import useTodos from "@/hooks/useTodos";
import { TodoItem } from "@/components/TodoItem";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const { todos, addTodo, deleteTodo, editTodo, toggleComplete } = useTodos();
  return (
    <main className="p-8">
      <TodoForm onSubmit={addTodo} />
      <div className="mt-8">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onToggleComplete={toggleComplete}
            onUpdate={editTodo}
          />
        ))}
      </div>
    </main>
  );
}
