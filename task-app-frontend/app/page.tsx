"use client";

import { useState, useEffect, useCallback } from "react";
import { Task, TaskStatus, CreateTaskDto, UpdateTaskDto } from "@/lib/types";
import { getTasks, createTask, updateTask, deleteTask } from "@/lib/tasks-api";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { TaskList } from "@/components/tasks/task-list";
import { TaskFilters } from "@/components/tasks/task-filters";
import { TaskForm } from "@/components/tasks/task-form";
import { DeleteConfirmModal } from "@/components/tasks/delete-confirm-modal";
import { SummaryPanel, PrioritySuggestions } from "@/components/ai/ai-panels";
import { HiPlus, HiClipboardCheck } from "react-icons/hi";

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = async (data: CreateTaskDto | UpdateTaskDto) => {
    setIsSubmitting(true);
    try {
      await createTask(data as CreateTaskDto);
      await fetchTasks();
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateTask = async (data: CreateTaskDto | UpdateTaskDto) => {
    if (!editingTask) return;
    setIsSubmitting(true);
    try {
      await updateTask(editingTask.id, data as UpdateTaskDto);
      await fetchTasks();
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusChange = async (task: Task, status: TaskStatus) => {
    try {
      await updateTask(task.id, { status });
      await fetchTasks();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDeleteTask = async () => {
    if (!deletingTask) return;
    setIsDeleting(true);
    try {
      await deleteTask(deletingTask.id);
      await fetchTasks();
      setDeletingTask(null);
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const counts = {
    all: tasks.length,
    [TaskStatus.PENDING]: tasks.filter((t) => t.status === TaskStatus.PENDING)
      .length,
    [TaskStatus.IN_PROGRESS]: tasks.filter(
      (t) => t.status === TaskStatus.IN_PROGRESS
    ).length,
    [TaskStatus.COMPLETED]: tasks.filter(
      (t) => t.status === TaskStatus.COMPLETED
    ).length,
  };

  const filteredTasks = statusFilter
    ? tasks.filter((t) => t.status === statusFilter)
    : tasks;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-white flex items-center justify-center">
                <HiClipboardCheck className="w-5 h-5 text-white dark:text-zinc-900" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Task Manager
                </h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Gestión inteligente de tareas
                </p>
              </div>
            </div>
            <Button onClick={() => setIsFormOpen(true)} className="gap-2">
              <HiPlus className="w-4 h-4" />
              Nueva Tarea
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI Features */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <SummaryPanel onRefresh={fetchTasks} />
          <PrioritySuggestions tasks={tasks} onApply={fetchTasks} />
        </div>

        {/* Filters */}
        <div className="mb-6 overflow-x-auto">
          <TaskFilters
            currentFilter={statusFilter}
            onFilterChange={setStatusFilter}
            counts={counts}
          />
        </div>

        {/* Task List */}
        <TaskList
          tasks={filteredTasks}
          isLoading={isLoading}
          onEdit={setEditingTask}
          onDelete={setDeletingTask}
          onStatusChange={handleStatusChange}
        />
      </main>

      {/* Create Task Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Nueva Tarea"
      >
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setIsFormOpen(false)}
          isSubmitting={isSubmitting}
        />
      </Modal>

      {/* Edit Task Modal */}
      <Modal
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        title="Editar Tarea"
      >
        <TaskForm
          task={editingTask}
          onSubmit={handleUpdateTask}
          onCancel={() => setEditingTask(null)}
          isSubmitting={isSubmitting}
        />
      </Modal>

      {/* Delete Confirmation */}
      <DeleteConfirmModal
        isOpen={!!deletingTask}
        task={deletingTask}
        onConfirm={handleDeleteTask}
        onCancel={() => setDeletingTask(null)}
        isDeleting={isDeleting}
      />
    </div>
  );
}
