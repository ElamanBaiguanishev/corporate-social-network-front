import { FC, useEffect, useState } from 'react';
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box
} from '@mui/material';
import { ITask, TaskPriority, TaskStatus, CreateTaskDto } from '../../types/task/task.types';
import { TaskService } from '../../api/task.service';

interface TaskFormProps {
    task?: ITask | null;
    onSubmit: () => void;
    onCancel: () => void;
}

export const TaskForm: FC<TaskFormProps> = ({ task, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<CreateTaskDto>({
        title: '',
        description: '',
        priority: TaskPriority.MEDIUM,
        status: TaskStatus.TODO
    });

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title,
                description: task.description,
                priority: task.priority,
                status: task.status,
                assigneeId: task.assignee?.id,
                dueDate: task.dueDate
            });
        }
    }, [task]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (task) {
                await TaskService.updateTask(task.id, formData);
            } else {
                await TaskService.createTask(formData);
            }
            onSubmit();
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <DialogTitle>
                {task ? 'Редактировать задачу' : 'Создать задачу'}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                    <TextField
                        label="Название"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        fullWidth
                    />

                    <TextField
                        label="Описание"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                        fullWidth
                        multiline
                        rows={4}
                    />

                    <FormControl fullWidth>
                        <InputLabel>Приоритет</InputLabel>
                        <Select
                            value={formData.priority}
                            label="Приоритет"
                            onChange={(e) => setFormData({ ...formData, priority: e.target.value as TaskPriority })}
                        >
                            {Object.values(TaskPriority).map((priority) => (
                                <MenuItem key={priority} value={priority}>
                                    {priority}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Статус</InputLabel>
                        <Select
                            value={formData.status}
                            label="Статус"
                            onChange={(e) => setFormData({ ...formData, status: e.target.value as TaskStatus })}
                        >
                            {Object.values(TaskStatus).map((status) => (
                                <MenuItem key={status} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        label="Срок выполнения"
                        type="date"
                        value={formData.dueDate || ''}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Отмена</Button>
                <Button type="submit" variant="contained">
                    {task ? 'Сохранить' : 'Создать'}
                </Button>
            </DialogActions>
        </form>
    );
}; 