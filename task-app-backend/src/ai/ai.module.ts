import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { TasksModule } from '../tasks/tasks.module';

/**
 * Module for AI-powered features
 */
@Module({
  imports: [TasksModule],
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}
