import { FC, useEffect, useState } from 'react';
import { Box, Button, Dialog } from '@mui/material';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { TaskColumn } from './TaskColumn';
import { TaskForm } from './TaskForm';
import { ITask, TaskStatus } from '../../types/task/task.types';
import { TaskService } from '../../api/task.service';

const columns = [
    { title: 'К выполнению', status: TaskStatus.TODO },
    { title: 'В работе', status: TaskStatus.IN_PROGRESS },
    { title: 'Готово', status: TaskStatus.DONE }
];

export const KanbanBoard: FC = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<ITask | null>(null);

    const fetchTasks = async () => {
        try {
            const data = await TaskService.getAllTasks();
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDragEnd = async (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const taskId = parseInt(draggableId);
        const newStatus = destination.droppableId as TaskStatus;

        try {
            await TaskService.updateTask(taskId, { status: newStatus });
            fetchTasks();
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    const handleEdit = (task: ITask) => {
        setEditingTask(task);
        setIsFormOpen(true);
    };

    const handleDelete = async (taskId: number) => {
        try {
            await TaskService.deleteTask(taskId);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleFormSubmit = async () => {
        await fetchTasks();
        setIsFormOpen(false);
        setEditingTask(null);
    };

    const getTasksByStatus = (status: TaskStatus) => {
        return tasks.filter(task => task.status === status);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    onClick={() => setIsFormOpen(true)}
                >
                    Создать задачу
                </Button>
            </Box>

            <DragDropContext onDragEnd={handleDragEnd}>
                <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
                    {columns.map(column => (
                        <TaskColumn
                            key={column.status}
                            title={column.title}
                            status={column.status}
                            tasks={getTasksByStatus(column.status)}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </Box>
            </DragDropContext>

            <Dialog
                open={isFormOpen}
                onClose={() => {
                    setIsFormOpen(false);
                    setEditingTask(null);
                }}
                maxWidth="sm"
                fullWidth
            >
                <TaskForm
                    task={editingTask}
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                        setIsFormOpen(false);
                        setEditingTask(null);
                    }}
                />
            </Dialog>
        </Box>
    );
}; 