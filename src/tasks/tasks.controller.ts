import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private TasksService: TasksService) {}

    // @Get()
    // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
    //     if (Object.keys(filterDto).length) {
    //         return this.TasksService.getTaskWithFilters(filterDto);
    //     }else{

    //         return this.TasksService.getAllTasks();
    //     }
    // }


    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.TasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.TasksService.createTask(createTaskDto);
    }

    // @Delete('/:id')
    // deleteTask(@Param('id') id: string): void {
    //     this.TasksService.deleteTask(id);
    // }

    // @Patch('/:id/status')
    // updateTaskStatus (
    //     @Param('id') id: string,
    //     @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    // ): Task {
    //     return this.TasksService.updateTaskStatus(id, status);
    // }
}
