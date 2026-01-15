import api from "./api";
import { Task, CreateTaskDto, UpdateTaskDto, TaskStatus } from "./types";

/**
 * Fetches all tasks with optional status filter
 */
export const getTasks = async (status?: TaskStatus): Promise<Task[]> => {
  const params = status ? { status } : {};
  const response = await api.get<Task[]>("/tasks", { params });
  return response.data;
};

/**
 * Fetches a single task by ID
 */
export const getTask = async (id: string): Promise<Task> => {
  const response = await api.get<Task>(`/tasks/${id}`);
  return response.data;
};

/**
 * Creates a new task
 */
export const createTask = async (data: CreateTaskDto): Promise<Task> => {
  const response = await api.post<Task>("/tasks", data);
  return response.data;
};

/**
 * Updates an existing task
 */
export const updateTask = async (
  id: string,
  data: UpdateTaskDto
): Promise<Task> => {
  const response = await api.patch<Task>(`/tasks/${id}`, data);
  return response.data;
};

/**
 * Deletes a task by ID
 */
export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
