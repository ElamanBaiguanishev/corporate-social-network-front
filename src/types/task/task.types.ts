export enum TaskPriority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
}

export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

export interface ITask {
    id: number;
    title: string;
    description: string;
    priority: TaskPriority;
    status: TaskStatus;
    assignee?: {
        id: number;
        username: string;
    };
    creator: {
        id: number;
        username: string;
    };
    dueDate?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTaskDto {
    title: string;
    description: string;
    priority?: TaskPriority;
    status?: TaskStatus;
    assigneeId?: number;
    dueDate?: string;
}

export interface UpdateTaskDto extends Partial<CreateTaskDto> {} 