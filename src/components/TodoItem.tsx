import React, { use, useState } from "react";
import { Todo, Priority, UpdateTodo } from "@/types";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Trash, PencilRuler } from "lucide-react";

interface TodoItemProps {
  todo: Todo;
  onUpdate: (updates: UpdateTodo) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export const TodoItem = ({
  todo,
  onToggleComplete,
  onDelete,
  onUpdate,
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(
    todo.description || ""
  );
  const [editPriority, setEditPriority] = useState(todo.priority);
  const saveTodo = () => {
    onUpdate({
      id: todo.id,
      title: editTitle,
      description: editDescription,
      priority: editPriority,
    });
    setIsEditing(false);
  };
  const cancelTodo = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
    setEditPriority(todo.priority);
    setIsEditing(false);
  };
  if (isEditing) {
    return (
      <Card className="mb-4 p-4">
        <Input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Title"
        />
        <Textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          placeholder="Description"
        />
        <Select
          value={editPriority}
          onValueChange={(value) => setEditPriority(value as Priority)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low Priority</SelectItem>
            <SelectItem value="medium">Medium Priority</SelectItem>
            <SelectItem value="high">High Priority</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex align-middle justify-end gap-3">
          <Button onClick={saveTodo}>Save</Button>
          <Button onClick={cancelTodo} variant="destructive">
            X
          </Button>
        </div>
      </Card>
    );
  }
  return (
    <div className="mb-4">
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <Badge variant="secondary" className="font-semibold text-sm">
        Priority: {todo.priority}
      </Badge>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onToggleComplete(todo.id)}
      >
        {todo.completed ? "Completed" : "Pending"}
      </Button>
      <Button variant="destructive" size="sm" onClick={() => onDelete(todo.id)}>
        <Trash />
      </Button>
      <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
        <PencilRuler />
      </Button>
    </div>
  );
};
