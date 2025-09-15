import React, { useState } from "react";
import { CreateTodo, Priority } from "@/types";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface ToDoFormProps {
  onSubmit: (todo: CreateTodo) => void;
}

export const TodoForm = ({ onSubmit }: ToDoFormProps) => {
  const [errors, setErrors] = useState<Partial<CreateTodo>>({});
  const [formData, setFormData] = useState<CreateTodo>({
    title: "",
    description: "",
    priority: "medium",
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateTodo> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
      setFormData({ title: "", description: "", priority: "medium" });
      setErrors({});
    }
  };

  const clearError = (field: keyof CreateTodo) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create New Todo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <Input
              id="title"
              placeholder="What needs to be done?"
              value={formData.title}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, title: e.target.value }));
                clearError("title");
              }}
              className={`${
                errors.title ? "border-red-300 focus:border-red-500" : ""
              }`}
            />
            {errors.title && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                {errors.title}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Description{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <Textarea
              id="description"
              placeholder="Add more details about this task..."
              value={formData.description}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
              className="min-h-[80px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="priority"
              className="text-sm font-medium text-gray-700"
            >
              Priority
            </label>
            <Select
              value={formData.priority}
              onValueChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  priority: value as Priority,
                }));
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select priority level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    Low Priority
                  </div>
                </SelectItem>
                <SelectItem value="medium">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    Medium Priority
                  </div>
                </SelectItem>
                <SelectItem value="high">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    High Priority
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            type="submit"
            className="w-full flex items-center justify-center gap-2 h-11"
          >
            <Plus className="h-4 w-4" />
            Add Todo
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
