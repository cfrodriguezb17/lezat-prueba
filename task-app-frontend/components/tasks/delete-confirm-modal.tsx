"use client";

import { Task } from "@/lib/types";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { HiExclamationCircle } from "react-icons/hi";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  task: Task | null;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}

/**
 * Confirmation modal for task deletion
 */
export const DeleteConfirmModal = ({
  isOpen,
  task,
  onConfirm,
  onCancel,
  isDeleting,
}: DeleteConfirmModalProps) => {
  if (!task) return null;
  return (
    <Modal isOpen={isOpen} onClose={onCancel} size="sm">
      <div className="text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
          <HiExclamationCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
        </div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          Eliminar tarea
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
          ¿Estás seguro de que deseas eliminar{" "}
          <span className="font-medium text-zinc-900 dark:text-white">
            "{task.title}"
          </span>
          ? Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-center gap-3">
          <Button variant="secondary" onClick={onCancel} disabled={isDeleting}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirm} isLoading={isDeleting}>
            Eliminar
          </Button>
        </div>
      </div>
    </Modal>
  );
};
