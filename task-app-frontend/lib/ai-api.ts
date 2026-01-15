import api from "./api";
import { PrioritySuggestion } from "./types";

interface SummaryResponse {
  summary: string;
}

interface AutoCompleteResponse {
  description: string;
}

/**
 * Gets AI-generated summary of pending tasks
 */
export const getSummary = async (): Promise<string> => {
  const response = await api.get<SummaryResponse>("/ai/summary");
  return response.data.summary;
};

/**
 * Gets AI-suggested priorities for specified tasks
 */
export const suggestPriorities = async (
  taskIds: string[]
): Promise<PrioritySuggestion[]> => {
  const response = await api.post<PrioritySuggestion[]>("/ai/priorities", {
    taskIds,
  });
  return response.data;
};

/**
 * Gets AI-generated description for a task title
 */
export const autoCompleteDescription = async (
  title: string
): Promise<string> => {
  const response = await api.post<AutoCompleteResponse>("/ai/autocomplete", {
    title,
  });
  return response.data.description;
};
