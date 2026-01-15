import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

/**
 * DTO for requesting priority suggestions
 */
export class SuggestPrioritiesDto {
  @IsArray()
  @IsUUID('4', { each: true })
  taskIds: string[];
}

/**
 * DTO for auto-completing a task description
 */
export class AutoCompleteDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
