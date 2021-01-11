import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private TasksService: TasksService) {}

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto) {
       return this.TasksService.getTasks(filterDto);
    }


    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.TasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.TasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.TasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus (
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    ): Promise<Task> {
        return this.TasksService.updateTaskStatus(id, status);
    }
}
