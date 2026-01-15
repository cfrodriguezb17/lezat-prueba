"use client";

import { useState, useEffect } from "react";
import { Task, TaskStatus, CreateTaskDto, UpdateTaskDto } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { autoCompleteDescription } from "@/lib/ai-api";
import { HiSparkles } from "react-icons/hi";

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (data: CreateTaskDto | UpdateTaskDto) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

const statusOptions = [
  { value: TaskStatus.PENDING, label: "Pendiente" },
  { value: TaskStatus.IN_PROGRESS, label: "En Progreso" },
  { value: TaskStatus.COMPLETED, label: "Completada" },
];

/**
 * Task form component for create/edit with AI auto-complete
 */
export const TaskForm = ({
  task,
  onSubmit,
  onCancel,
  isSubmitting,
}: TaskFormProps) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState<TaskStatus>(
    task?.status || TaskStatus.PENDING
  );
  const [isAutoCompleting, setIsAutoCompleting] = useState(false);
  const [errors, setErrors] = useState<{ title?: string }>({});
  const isEditing = !!task;

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setStatus(task.status);
    }
  }, [task]);

  const handleAutoComplete = async () => {
    if (!title.trim() || title.length < 3) {
      setErrors({ title: "Ingresa al menos 3 caracteres para auto-completar" });
      return;
    }
    setIsAutoCompleting(true);
    try {
      const suggested = await autoCompleteDescription(title);
      setDescription(suggested);
    } catch {
      console.error("Error auto-completing description");
    } finally {
      setIsAutoCompleting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || title.length < 3) {
      setErrors({ title: "El título debe tener al menos 3 caracteres" });
      return;
    }
    setErrors({});
    const data: CreateTaskDto | UpdateTaskDto = {
      title: title.trim(),
      description: description.trim() || undefined,
      status,
    };
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="¿Qué necesitas hacer?"
        error={errors.title}
        autoFocus
      />
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Descripción
          </label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleAutoComplete}
            isLoading={isAutoCompleting}
            disabled={isAutoCompleting || !title.trim()}
            className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 dark:text-violet-400 dark:hover:bg-violet-950"
          >
            <HiSparkles className="w-4 h-4" />
            Auto-completar con IA
          </Button>
        </div>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Agrega más detalles sobre esta tarea..."
          rows={4}
        />
      </div>
      {isEditing && (
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Estado
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {isEditing ? "Guardar Cambios" : "Crear Tarea"}
        </Button>
      </div>
    </form>
  );
};
