import { FC } from 'react';
import { Card, CardContent, Typography, Chip, Box, IconButton } from '@mui/material';
import { ITask, TaskPriority, TaskStatus } from '../../types/task/task.types';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface TaskCardProps {
    task: ITask;
    onEdit: (task: ITask) => void;
    onDelete: (taskId: number) => void;
}

const priorityColors = {
    [TaskPriority.LOW]: 'success',
    [TaskPriority.MEDIUM]: 'warning',
    [TaskPriority.HIGH]: 'error'
} as const;

const statusColors = {
    [TaskStatus.TODO]: 'default',
    [TaskStatus.IN_PROGRESS]: 'primary',
    [TaskStatus.DONE]: 'success'
} as const;

export const TaskCard: FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
    return (
        <Card sx={{ mb: 2, position: 'relative' }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="h6" component="div">
                        {task.title}
                    </Typography>
                    <Box>
                        <IconButton size="small" onClick={() => onEdit(task)}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={() => onDelete(task.id)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {task.description}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <Chip 
                        label={task.priority} 
                        size="small" 
                        color={priorityColors[task.priority]}
                    />
                    <Chip 
                        label={task.status} 
                        size="small" 
                        color={statusColors[task.status]}
                    />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                        Исполнитель: {task.assignee?.username || 'Не назначен'}
                    </Typography>
                    {task.dueDate && (
                        <Typography variant="caption" color="text.secondary">
                            Срок: {format(new Date(task.dueDate), 'dd MMMM yyyy', { locale: ru })}
                        </Typography>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}; 