import { TodoForm } from "@/components/TodoForm";
import useTodos from "@/hooks/useTodos";
import { TodoItem } from "@/components/TodoItem";
import { Footer } from "@/components/Footer";
import { TodoStats } from "@/components/TodoStats";

export default function Home() {
  const {
    todos,
    addTodo,
    deleteTodo,
    editTodo,
    toggleComplete,
    totalCount,
    completedCount,
  } = useTodos();
  return (
    <main className="px-28 py-10">
      <TodoForm onSubmit={addTodo} />

      <TodoStats completedCount={completedCount} totalCount={totalCount} />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
      <Footer />
    </main>
  );
}
