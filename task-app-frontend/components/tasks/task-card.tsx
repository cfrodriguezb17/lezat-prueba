"use client";

import { Task, TaskStatus } from "@/lib/types";
import { Badge, PriorityBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HiPencil,
  HiTrash,
  HiCheckCircle,
  HiClock,
  HiPlay,
} from "react-icons/hi";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onStatusChange: (task: Task, status: TaskStatus) => void;
}

const statusActions: Record<
  TaskStatus,
  { next: TaskStatus; icon: React.ReactNode; label: string }[]
> = {
  [TaskStatus.PENDING]: [
    {
      next: TaskStatus.IN_PROGRESS,
      icon: <HiPlay className="w-4 h-4" />,
      label: "Iniciar",
    },
  ],
  [TaskStatus.IN_PROGRESS]: [
    {
      next: TaskStatus.COMPLETED,
      icon: <HiCheckCircle className="w-4 h-4" />,
      label: "Completar",
    },
    {
      next: TaskStatus.PENDING,
      icon: <HiClock className="w-4 h-4" />,
      label: "Pausar",
    },
  ],
  [TaskStatus.COMPLETED]: [
    {
      next: TaskStatus.PENDING,
      icon: <HiClock className="w-4 h-4" />,
      label: "Reabrir",
    },
  ],
};

/**
 * Individual task card component
 */
export const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskCardProps) => {
  const actions = statusActions[task.status];
  const handleStatusClick = (next: TaskStatus) => {
    onStatusChange(task, next);
  };
  return (
    <div className="group p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-zinc-900 dark:text-white truncate">
              {task.title}
            </h3>
            <PriorityBadge priority={task.priority} />
          </div>
          {task.description && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-3">
              {task.description}
            </p>
          )}
          <div className="flex items-center gap-2">
            <Badge status={task.status} />
            {actions.map((action) => (
              <Button
                key={action.next}
                variant="ghost"
                size="sm"
                onClick={() => handleStatusClick(action.next)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={action.label}
              >
                {action.icon}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(task)}
            aria-label="Editar tarea"
          >
            <HiPencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(task)}
            aria-label="Eliminar tarea"
            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
          >
            <HiTrash className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
