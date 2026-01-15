import clsx from "clsx";
import { TaskStatus } from "@/lib/types";

interface BadgeProps {
  status: TaskStatus;
}

const statusConfig: Record<TaskStatus, { label: string; className: string }> = {
  [TaskStatus.PENDING]: {
    label: "Pendiente",
    className:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  },
  [TaskStatus.IN_PROGRESS]: {
    label: "En Progreso",
    className:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  },
  [TaskStatus.COMPLETED]: {
    label: "Completada",
    className:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
};

/**
 * Status badge component with color coding
 */
export const Badge = ({ status }: BadgeProps) => {
  const config = statusConfig[status];
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        config.className
      )}
    >
      {config.label}
    </span>
  );
};

interface PriorityBadgeProps {
  priority: number | null;
}

const priorityConfig: Record<number, { label: string; className: string }> = {
  1: {
    label: "Urgente",
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  },
  2: {
    label: "Alta",
    className:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  },
  3: {
    label: "Media",
    className:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  4: {
    label: "Baja",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  },
  5: {
    label: "Mínima",
    className: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-400",
  },
};

/**
 * Priority badge component with color coding
 */
export const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
  if (priority === null) return null;
  const config = priorityConfig[priority] || priorityConfig[5];
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
        config.className
      )}
    >
      P{priority}
    </span>
  );
};
