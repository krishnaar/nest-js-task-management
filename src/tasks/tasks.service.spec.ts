import { Test } from '@nestjs/testing';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';

const mockUser = { username: 'Test user' }

const mockTaskRepository = () => ({
    getTask: jest.fn(),
});

describe('TasksServices', () => {
    let tasksService;
    let taskRepository;

    beforeEach( async () =>{
        const module = await Test.createTestingModule({
            providers:[
                TasksService,
                { provide: TaskRepository, useFactory: mockTaskRepository },
            ],
        }).compile();

        tasksService = await module.get<TasksService>(TasksService);
        taskRepository = await module.get<TaskRepository>(TaskRepository);
    });

    describe('getTasks', () => {
        it('gets all tasks from the repository', async () => {
            taskRepository.getTask.mockResolvedValue('someValue');

            expect(taskRepository.getTask).not.toHaveBeenCalled();
            const filters: GetTasksFilterDto = { status: TaskStatus.IN_PROGRESS, search: 'Some search query' };
            const result = await tasksService.getTasks(filters, mockUser);
            tasksService.getTasks(filters, mockUser);
            expect(taskRepository.getTask).toHaveBeenCalled();
            expect(result).toEqual('someValue');
        });
    });
});