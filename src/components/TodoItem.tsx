import React, { useState } from "react";
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
import {
  Trash,
  PencilRuler,
  Save,
  X,
  CircleDashed,
  CircleCheck,
} from "lucide-react";

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
            <SelectItem value="low">🟢 Low Priority</SelectItem>
            <SelectItem value="medium">🟡 Medium Priority</SelectItem>
            <SelectItem value="high">🔴 High Priority</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center justify-end gap-2 pt-2">
          <Button
            onClick={cancelTodo}
            variant="outline"
            size="sm"
            className="hover:bg-gray-50"
          >
            <X className="w-4 h-4 mr-1" />
            Cancel
          </Button>
          <Button onClick={saveTodo} size="sm">
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>
        </div>
      </Card>
    );
  }
  return (
    <div className="mb-4">
      <div className="flex items-start gap-3 mb-3">
        <button
          className="mt-1 hover:scale-105 transition-transform duration-200 p-1"
          onClick={() => onToggleComplete(todo.id)}
        >
          {todo.completed ? (
            <CircleCheck className="text-green-600 h-5 w-5" />
          ) : (
            <CircleDashed className="text-gray-400 h-5 w-5 hover:text-gray-600" />
          )}
        </button>
        <div className="flex-1 min-w-0">
          <h3
            className={`text-lg font-semibold leading-tight ${
              todo.completed ? "line-through text-gray-500" : "text-gray-900"
            }`}
          >
            {todo.title}
          </h3>
          {todo.description && (
            <p
              className={`mt-1 text-sm leading-relaxed ${
                todo.completed ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {todo.description}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Badge variant="outline" className="capitalize">
          {todo.priority} Priority
        </Badge>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsEditing(true)}
          className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-900"
          aria-label="Edit todo"
        >
          <PencilRuler className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(todo.id)}
          className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-700"
          aria-label="Delete todo"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
