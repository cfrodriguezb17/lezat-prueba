import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

/**
 * DTO for updating an existing task (all fields optional)
 */
export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
