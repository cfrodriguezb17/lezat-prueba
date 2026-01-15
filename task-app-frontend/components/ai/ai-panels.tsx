"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { getSummary, suggestPriorities } from "@/lib/ai-api";
import { updateTask } from "@/lib/tasks-api";
import { Task, PrioritySuggestion } from "@/lib/types";
import { HiSparkles, HiRefresh, HiLightBulb, HiCheck } from "react-icons/hi";

interface SummaryPanelProps {
  onRefresh: () => void;
}

/**
 * AI Summary panel component
 */
export const SummaryPanel = ({ onRefresh }: SummaryPanelProps) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    try {
      const result = await getSummary();
      setSummary(result);
      setIsOpen(true);
    } catch {
      console.error("Error generating summary");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <Button
        variant="secondary"
        onClick={handleGenerateSummary}
        isLoading={isLoading}
        className="gap-2"
      >
        <HiSparkles className="w-4 h-4 text-violet-500" />
        Generar Resumen IA
      </Button>
    );
  }

  return (
    <Card className="mb-6 border-violet-200 dark:border-violet-800">
      <CardBody>
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
              <HiSparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            </div>
            <h3 className="font-semibold text-zinc-900 dark:text-white">
              Resumen Inteligente
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleGenerateSummary}
              isLoading={isLoading}
              aria-label="Actualizar resumen"
            >
              <HiRefresh className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar resumen"
            >
              ×
            </Button>
          </div>
        </div>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p className="text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap">
            {summary}
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

interface PrioritySuggestionsProps {
  tasks: Task[];
  onApply: () => void;
}

/**
 * Priority suggestions panel component
 */
export const PrioritySuggestions = ({
  tasks,
  onApply,
}: PrioritySuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<PrioritySuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const pendingTasks = tasks.filter((t) => t.status !== "COMPLETED");

  const handleSuggestPriorities = async () => {
    if (pendingTasks.length === 0) return;
    setIsLoading(true);
    try {
      const taskIds = pendingTasks.map((t) => t.id);
      const result = await suggestPriorities(taskIds);
      setSuggestions(result);
      setIsOpen(true);
    } catch {
      console.error("Error suggesting priorities");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyAll = async () => {
    setIsApplying(true);
    try {
      await Promise.all(
        suggestions.map((s) =>
          updateTask(s.taskId, { priority: s.suggestedPriority })
        )
      );
      onApply();
      setIsOpen(false);
      setSuggestions([]);
    } catch {
      console.error("Error applying priorities");
    } finally {
      setIsApplying(false);
    }
  };

  if (!isOpen) {
    return (
      <Button
        variant="secondary"
        onClick={handleSuggestPriorities}
        isLoading={isLoading}
        disabled={pendingTasks.length === 0}
        className="gap-2"
      >
        <HiLightBulb className="w-4 h-4 text-amber-500" />
        Sugerir Prioridades
      </Button>
    );
  }

  return (
    <Card className="mb-6 border-amber-200 dark:border-amber-800">
      <CardBody>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <HiLightBulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="font-semibold text-zinc-900 dark:text-white">
              Sugerencias de Prioridad
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar sugerencias"
          >
            ×
          </Button>
        </div>
        <div className="space-y-3 mb-4">
          {suggestions.map((s) => {
            const task = tasks.find((t) => t.id === s.taskId);
            if (!task) return null;
            return (
              <div
                key={s.taskId}
                className="flex items-start gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 text-xs font-bold flex items-center justify-center">
                  P{s.suggestedPriority}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-zinc-900 dark:text-white truncate">
                    {task.title}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {s.reason}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <Button
          onClick={handleApplyAll}
          isLoading={isApplying}
          className="w-full gap-2"
        >
          <HiCheck className="w-4 h-4" />
          Aplicar Todas las Prioridades
        </Button>
      </CardBody>
    </Card>
  );
};
