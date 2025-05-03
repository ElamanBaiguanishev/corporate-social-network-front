import { FC, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton, Divider, CircularProgress } from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    selectNotifications,
    selectNotificationsLoading
} from '../../store/notifications/notificationsSlice';

export const NotificationsList: FC = () => {
    const dispatch = useAppDispatch();
    const notifications = useAppSelector(selectNotifications);
    const loading = useAppSelector(selectNotificationsLoading);

    useEffect(() => {
        dispatch(fetchNotifications());
    }, [dispatch]);

    const handleMarkAsRead = async (notificationId: number) => {
        await dispatch(markAsRead(notificationId));
        dispatch(fetchNotifications());
    };

    const handleMarkAllAsRead = async () => {
        await dispatch(markAllAsRead());
        dispatch(fetchNotifications());
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <CircularProgress size={24} />
            </Box>
        );
    }

    if (notifications.length === 0) {
        return (
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography color="text.secondary">
                    Нет новых уведомлений
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                borderBottom: '1px solid',
                borderColor: 'divider'
            }}>
                <Typography variant="h6">Уведомления</Typography>
                <IconButton
                    onClick={handleMarkAllAsRead}
                    size="small"
                    title="Отметить все как прочитанные"
                >
                    <DoneAllIcon />
                </IconButton>
            </Box>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {notifications.map((notification, index) => (
                    <Box key={notification.id}>
                        <ListItem
                            alignItems="flex-start"
                            secondaryAction={
                                !notification.isRead && (
                                    <IconButton
                                        edge="end"
                                        onClick={() => handleMarkAsRead(notification.id)}
                                        size="small"
                                    >
                                        <DoneAllIcon />
                                    </IconButton>
                                )
                            }
                            sx={{
                                bgcolor: notification.isRead ? 'transparent' : 'action.hover',
                                '&:hover': {
                                    bgcolor: 'action.hover'
                                }
                            }}
                        >
                            <ListItemText
                                primary={notification.content}
                                secondary={
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {new Date(notification.createdAt).toLocaleString()}
                                    </Typography>
                                }
                            />
                        </ListItem>
                        {index < notifications.length - 1 && <Divider />}
                    </Box>
                ))}
            </List>
        </Box>
    );
}; 