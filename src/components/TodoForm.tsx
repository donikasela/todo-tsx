import React, { useState } from "react";
import { CreateTodo, Priority } from "@/types";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Button } from "./ui/button";

interface ToDoFormProps {
  onSubmit: (todo: CreateTodo) => void;
}

export const TodoForm = ({ onSubmit }: ToDoFormProps) => {
  const [error, setErrors] = useState<Partial<CreateTodo>>({});
  const [formData, setFormData] = useState<CreateTodo>({
    title: "",
    description: "",
    priority: "medium",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); //stops browser from refreshing  page

    if (!formData.title.trim()) {
      setErrors({ title: "Title is required" });
      return;
    }
    onSubmit(formData);

    setFormData({ title: "", description: "", priority: "medium" });
  };
  return (
    <div>
      <Card>
        <p className="font-bold">Add new todo</p>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Title"
            value={formData.title}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, title: e.target.value }));
              setErrors({}); // clears errors as soon as user types
            }}
          />

          {error.title && <p className="text-red-600 text-sm">{error.title}</p>}
          <Textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, description: e.target.value }));
            }}
          />
          <Select
            onValueChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                priority: e as Priority,
              }));
            }}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select a priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Priority</SelectLabel>
                <SelectItem value="low">Low Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button type="submit">Add To Do</Button>
        </form>
      </Card>
    </div>
  );
};
