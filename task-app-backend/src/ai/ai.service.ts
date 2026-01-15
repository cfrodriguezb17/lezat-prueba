import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Task } from '../tasks/entities/task.entity';

export interface PrioritySuggestion {
  taskId: string;
  suggestedPriority: number;
  reason: string;
}

/**
 * Service for AI-powered task features using Google Gemini
 */
@Injectable()
export class AiService {
  private readonly genAI: GoogleGenerativeAI;
  private readonly model: ReturnType<GoogleGenerativeAI['getGenerativeModel']>;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');
    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-3-flash-preview',
    });
  }

  /**
   * Generates an intelligent summary of pending tasks
   */
  async generateSummary(tasks: Task[]): Promise<string> {
    if (tasks.length === 0) {
      return 'No hay tareas pendientes. ¡Excelente trabajo!';
    }
    const taskList = tasks
      .map(
        (t, i) =>
          `${i + 1}. "${t.title}"${t.description ? `: ${t.description}` : ''}`,
      )
      .join('\n');
    const prompt = `Eres un asistente de productividad. Analiza las siguientes tareas pendientes y genera un resumen ejecutivo breve en español. Incluye:
1. Una visión general de las tareas
2. Áreas de enfoque principales
3. Una recomendación para abordarlas

Tareas:
${taskList}

Responde de forma concisa y útil.`;
    const result = await this.model.generateContent(prompt);
    return result.response.text();
  }

  /**
   * Suggests priorities for tasks based on their descriptions
   */
  async suggestPriorities(tasks: Task[]): Promise<PrioritySuggestion[]> {
    if (tasks.length === 0) {
      return [];
    }
    const taskList = tasks
      .map(
        (t) =>
          `- ID: ${t.id}, Título: "${t.title}", Descripción: "${t.description || 'Sin descripción'}"`,
      )
      .join('\n');
    const prompt = `Eres un experto en gestión de tareas. Analiza las siguientes tareas y asigna una prioridad del 1 al 5 (1 = más urgente, 5 = menos urgente) basándote en su título y descripción.

Tareas:
${taskList}

Responde ÚNICAMENTE con un JSON array válido con este formato exacto, sin texto adicional:
[{"taskId": "uuid", "suggestedPriority": número, "reason": "razón breve"}]`;
    const result = await this.model.generateContent(prompt);
    const responseText = result.response.text();
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return [];
    }
    return JSON.parse(jsonMatch[0]) as PrioritySuggestion[];
  }

  /**
   * Auto-completes a task description based on the title
   */
  async autoCompleteDescription(title: string): Promise<string> {
    const prompt = `Eres un asistente de productividad. Dado el siguiente título de tarea, genera una descripción breve y útil en español (máximo 2 oraciones) que describa lo que implica esta tarea.

Título: "${title}"

Responde solo con la descripción, sin comillas ni formato adicional.`;
    const result = await this.model.generateContent(prompt);
    return result.response.text().trim();
  }
}
