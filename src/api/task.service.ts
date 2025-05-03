import api  from './index';
import { CreateTaskDto, ITask, UpdateTaskDto } from '../types/task/task.types';

export const TaskService = {
    async createTask(dto: CreateTaskDto): Promise<ITask> {
        const { data } = await api.post<ITask>('tasks', dto);
        return data;
    },

    async getAllTasks(): Promise<ITask[]> {
        const { data } = await api.get<ITask[]>('tasks');
        return data;
    },

    async getTaskById(id: number): Promise<ITask> {
        const { data } = await api.get<ITask>(`tasks/${id}`);
        return data;
    },

    async updateTask(id: number, dto: UpdateTaskDto): Promise<ITask> {
        const { data } = await api.patch<ITask>(`tasks/${id}`, dto);
        return data;
    },

    async deleteTask(id: number): Promise<void> {
        await api.delete(`tasks/${id}`);
    },

    async getMyTasks(): Promise<ITask[]> {
        const { data } = await api.get<ITask[]>('tasks/assignee/me');
        return data;
    },

    async getCreatedTasks(): Promise<ITask[]> {
        const { data } = await api.get<ITask[]>('tasks/creator/me');
        return data;
    }
}; 