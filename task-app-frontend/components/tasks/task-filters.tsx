"use client";

import { TaskStatus } from "@/lib/types";
import clsx from "clsx";

interface TaskFiltersProps {
  currentFilter: TaskStatus | null;
  onFilterChange: (status: TaskStatus | null) => void;
  counts: Record<TaskStatus | "all", number>;
}

const filters: { value: TaskStatus | null; label: string }[] = [
  { value: null, label: "Todas" },
  { value: TaskStatus.PENDING, label: "Pendientes" },
  { value: TaskStatus.IN_PROGRESS, label: "En Progreso" },
  { value: TaskStatus.COMPLETED, label: "Completadas" },
];

/**
 * Status filter tabs component
 */
export const TaskFilters = ({
  currentFilter,
  onFilterChange,
  counts,
}: TaskFiltersProps) => {
  return (
    <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
      {filters.map((filter) => {
        const isActive = currentFilter === filter.value;
        const count = filter.value === null ? counts.all : counts[filter.value];
        return (
          <button
            key={filter.value || "all"}
            onClick={() => onFilterChange(filter.value)}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
              isActive
                ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            )}
            aria-pressed={isActive}
          >
            {filter.label}
            <span
              className={clsx(
                "px-1.5 py-0.5 rounded text-xs",
                isActive
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                  : "bg-zinc-200 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-500"
              )}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
