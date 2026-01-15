import { Controller, Get, Post, Body } from '@nestjs/common';
import { AiService, PrioritySuggestion } from './ai.service';
import { TasksService } from '../tasks/tasks.service';
import { TaskStatus } from '../tasks/enums/task-status.enum';
import { SuggestPrioritiesDto, AutoCompleteDto } from './dto/ai.dto';

interface SummaryResponse {
  summary: string;
}

interface AutoCompleteResponse {
  description: string;
}

/**
 * Controller for AI-powered task features
 */
@Controller('ai')
export class AiController {
  constructor(
    private readonly aiService: AiService,
    private readonly tasksService: TasksService,
  ) {}

  /**
   * Generates a summary of all pending tasks
   */
  @Get('summary')
  async getSummary(): Promise<SummaryResponse> {
    const pendingTasks = await this.tasksService.findAll(TaskStatus.PENDING);
    const summary = await this.aiService.generateSummary(pendingTasks);
    return { summary };
  }

  /**
   * Suggests priorities for specified tasks
   */
  @Post('priorities')
  async suggestPriorities(@Body() dto: SuggestPrioritiesDto) {
    const tasks = await Promise.all(
      dto.taskIds.map((id) => this.tasksService.findOne(id)),
    );
    return this.aiService.suggestPriorities(tasks);
  }

  /**
   * Auto-completes a task description based on title
   */
  @Post('autocomplete')
  async autoComplete(
    @Body() dto: AutoCompleteDto,
  ): Promise<AutoCompleteResponse> {
    const description = await this.aiService.autoCompleteDescription(dto.title);
    return { description };
  }
}
