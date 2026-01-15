import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './enums/task-status.enum';

/**
 * Service handling task business logic
 */
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  /**
   * Creates a new task
   */
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  /**
   * Retrieves all tasks with optional status filter
   */
  async findAll(status?: TaskStatus): Promise<Task[]> {
    if (status) {
      return this.taskRepository.find({
        where: { status },
        order: { createdAt: 'DESC' },
      });
    }
    return this.taskRepository.find({ order: { createdAt: 'DESC' } });
  }

  /**
   * Retrieves a single task by ID
   */
  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  /**
   * Updates an existing task
   */
  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    Object.assign(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

  /**
   * Removes a task by ID
   */
  async remove(id: string): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepository.remove(task);
  }

  /**
   * Updates the priority of a task
   */
  async updatePriority(id: string, priority: number): Promise<Task> {
    const task = await this.findOne(id);
    task.priority = priority;
    return this.taskRepository.save(task);
  }
}
