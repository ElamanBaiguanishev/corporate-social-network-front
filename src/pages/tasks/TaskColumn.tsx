import { FC } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { Droppable } from '@hello-pangea/dnd';
import { TaskStatus } from '../../types/task/task.types';
import { TaskCard } from './TaskCard';
import { ITask } from '../../types/task/task.types';

interface TaskColumnProps {
    title: string;
    status: TaskStatus;
    tasks: ITask[];
    onEdit: (task: ITask) => void;
    onDelete: (taskId: number) => void;
}

export const TaskColumn: FC<TaskColumnProps> = ({ title, status, tasks, onEdit, onDelete }) => {
    return (
        <Paper
            sx={{
                p: 2,
                minHeight: 500,
                width: 300,
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.default'
            }}
        >
            <Typography variant="h6" sx={{ mb: 2 }}>
                {title} ({tasks.length})
            </Typography>

            <Droppable droppableId={status}>
                {(provided) => (
                    <Box
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        sx={{
                            flex: 1,
                            minHeight: 100,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1
                        }}
                    >
                        {tasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))}
                        {provided.placeholder}
                    </Box>
                )}
            </Droppable>
        </Paper>
    );
}; 